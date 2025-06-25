import { useEffect, useState, useCallback } from "react";
import { Trash2, Pencil } from "lucide-react";
import EditarProductoModal from "./EditarProductoModal";
import AgregarProductoModal from "./AgregarProductoModal";
import type { Producto } from "../../types/producto";

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
      const query = new URLSearchParams();
      if (filtroTipo) query.append("tipo", filtroTipo);
      if (filtroTipo === "ropa" && filtroPrenda) {
        query.append("tipoPrenda", filtroPrenda);
      }
      if (busquedaNombre.trim()) query.append("nombre", busquedaNombre);

      const res = await fetch(
      `${import.meta.env.VITE_API_URL}/productos?${query.toString()}`,
        // `http://localhost:3000/api/productos?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudieron cargar los productos.");
    }
  }, [filtroTipo, filtroPrenda, busquedaNombre, token]);

  // Efecto para obtener los productos al cargar el componente
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProductos();
    }, 400);

    return () => clearTimeout(delay);
  }, [fetchProductos]);

  // Función para eliminar un producto
  // Muestra un modal de confirmación antes de eliminar
  const eliminarProducto = async (id: string) => {
    if (!confirm("¿Estás seguro que querés eliminar este producto?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar producto");

      fetchProductos();
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
      <div className="flex flex-col sm:flex-row gap-4 mb-4 ">
        <select
          value={filtroTipo}
          onChange={(e) => {
            setFiltroTipo(e.target.value);
            setFiltroPrenda(""); //resetear si cambia el tipo
          }}
          className="p-2 border rounded"
        >
          <option value="">Todos los tipos</option>
          <option value="ropa">Ropa</option>
          <option value="calzado">Calzado</option>
          <option value="accesorio">Accesorio</option>
        </select>

        {filtroTipo === "ropa" && (
          <select
            value={filtroPrenda}
            onChange={(e) => setFiltroPrenda(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Todas las prendas</option>
            <option value="remera">Remeras</option>
            <option value="buzo">Buzos</option>
            <option value="campera">Camperas</option>
            <option value="pantalón">Pantalones</option>
            <option value="ropa interior">Ropa interior</option>
          </select>
        )}
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="space-y-4">
        {productos.map((prod) => (
          <div
            key={prod._id}
            className="bg-white shadow rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">{prod.nombre}</h2>
              <p className="text-sm text-gray-600">
                ${prod.precio} • {prod.tipo} • Stock: {prod.stock}
              </p>
              {prod.destacado && (
                <span className="text-green-600 text-xs font-semibold">
                  Destacado
                </span>
              )}
            </div>
            <div className="mt-2 sm:mt-0 flex gap-2">
              <button
                onClick={() => editarProducto(prod)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Pencil size={18} /> Editar
              </button>

              <button
                onClick={() => eliminarProducto(prod._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Trash2 size={18} /> Eliminar
              </button>
            </div>
          </div>
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
