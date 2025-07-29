import { useEffect, useState, useCallback } from "react";
import EditarProductoModal from "./EditarProductoModal";
import AgregarProductoModal from "./AgregarProductoModal";
import { eliminarProducto, obtenerProductos } from "../../api/productosApi";
import type Producto from "../../types/producto";
import ProductoCard from "../../components/cardProducto";
import FiltroProductos from "../../components/filtro";

//pagina de dashboard donde se muestran los productos del usuario
//y se pueden agregar, editar o eliminar productos
export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState("");
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [busquedaNombre, setBusquedaNombre] = useState<string>("");
  const [filtroPrenda, setFiltroPrenda] = useState("");
  const token = localStorage.getItem("token");

  // Función para obtener los productos del usuario
  const fetchProductos = useCallback(async () => {
    try {
      const productos = await obtenerProductos(token || "", {
        tipo: filtroTipo,
        tipoPrenda: filtroPrenda,
        nombre: busquedaNombre,
      });
      setProductos(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudieron cargar los productos.");
    }
  }, [filtroTipo, filtroPrenda, busquedaNombre, token]);
// Efecto para cargar los productos al montar el componente
  useEffect(() => {
    const delay = setTimeout(() => { // Evita llamadas excesivas al API
      fetchProductos();
    }, 400);

    return () => clearTimeout(delay);
  }, [fetchProductos]);

  const handleEliminarProducto = async (id: string) => {
    if (!token) {
      alert("No se pudo eliminar el producto: token no encontrado.");
      return;
    }
    try {
      await eliminarProducto(id, token);
      fetchProductos(); // Recargá la lista luego de eliminar
    } catch {
      alert("No se pudo eliminar el producto.");
    }
  };

  const editarProducto = (producto: Producto) => {
    setProductoEditar(producto);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-center">Mis productos</h1>

      <button
        onClick={() => setMostrarAgregar(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Agregar producto
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* FILTROS */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busquedaNombre}
        onChange={(e) => setBusquedaNombre(e.target.value)}
        className="p-2 border rounded w-full sm:w-64"
      />
      <FiltroProductos
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        filtroPrenda={filtroPrenda}
        setFiltroPrenda={setFiltroPrenda}
      />

      {/* LISTA DE PRODUCTOS */}
      <div className="space-y-4">
        {productos.map((prod) => (
          <ProductoCard
            key={prod._id}
            producto={prod}
            onEditar={editarProducto}
            onEliminar={handleEliminarProducto}
          />
        ))}
      </div>

      {/* MODALES */}
      {mostrarAgregar && (
        <AgregarProductoModal
          token={token!}
          onClose={() => setMostrarAgregar(false)}
          onSuccess={fetchProductos}
        />
      )}

      {productoEditar && (
        <EditarProductoModal
          producto={productoEditar}
          token={token!}
          onClose={() => setProductoEditar(null)}
          onUpdate={fetchProductos}
        />
      )}
    </div>
  );
}
