import {  useState } from "react";

//modal para editar un producto
//muestra un formulario con los datos del producto
//y permite editarlo y guardarlo

interface Props {
  producto: Producto;
  token: string;
  onClose: () => void;
  onUpdate: () => void;
}

interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  color: string;
  descripcion: string;
  tipo: "ropa" | "accesorio" | "calzado";
  imagenes: string[];
  stock: number;
  destacado: boolean;
  ropa?: {
    talle: string[];
    tipoPrenda: string;
  };
  calzado?: {
    talle: string[];
  };
}

export default function EditarProductoModal({ producto, token, onClose, onUpdate }: Props) {
  // Estados locales para manejar los campos del formulario
  // Inicializa los estados con los valores del producto que se está editando
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [color, setColor] = useState(producto.color);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [imagenes, setImagenes] = useState<string[]>(producto.imagenes);
  const [stock, setStock] = useState<number | undefined>(producto.stock);
  const [destacado, setDestacado] = useState(producto.destacado);
  const [talles, setTalles] = useState<string[]>(producto.ropa?.talle || producto.calzado?.talle.map(String) || []);
  const [tipoPrenda, setTipoPrenda] = useState(producto.ropa?.tipoPrenda || "");
  const tallesRopa = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const tallesCalzado = Array.from({ length: 11 }, (_, i) => (34 + i).toString());

  const toggleTalle = (valor: string) => {
    setTalles((prev) =>
      prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
    );
  };

  const eliminarImagen = (url: string) => {
    setImagenes((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const actualizado: Partial<Producto> = {
      nombre,
      precio,
      color,
      descripcion,
      imagenes,
      stock: stock ?? 0,
      destacado,
    };

    if (producto.tipo === "ropa") {
      actualizado.ropa = {
        talle: talles,
        tipoPrenda,
      };
    } else if (producto.tipo === "calzado") {
      actualizado.calzado = {
        talle: talles,
      };
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/productos/${producto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actualizado),
      });

      if (!res.ok) throw new Error("Error al actualizar producto");

      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el producto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">Nombre:
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
            required
          /></label>
          <label className="block">Precio:
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          /></label>
          <label className="block">Colores disponibles:
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          /></label>
          <label className="block">Descripcion:
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          /></label>

          {producto.tipo === "ropa" && (
            <>
              <label className="block">Talles disponibles:
              <div className="flex flex-wrap gap-2">
                {tallesRopa.map((t) => (
                  <label key={t} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={talles.includes(t)}
                      onChange={() => toggleTalle(t)}
                    />
                    {t}
                  </label>
                ))}
              </div></label>
              <input
                type="text"
                placeholder="Tipo de prenda"
                value={tipoPrenda}
                onChange={(e) => setTipoPrenda(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled
              />
            </>
          )}

          {producto.tipo === "calzado" && (
            <>
              <label className="block">Talles disponibles:</label>
              <div className="flex flex-wrap gap-2">
                {tallesCalzado.map((t) => (
                  <label key={t} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={talles.includes(t)}
                      onChange={() => toggleTalle(t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </>
          )}
          <label className="block">Imagenes:</label>
          {imagenes.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagenes.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`imagen-${idx}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => eliminarImagen(url)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="block">Stock disponible:
          <input
            type="number"
            value={stock === undefined ? "" : stock}
            onChange={(e) => setStock(e.target.value === '' ? undefined : Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Stock disponible"
            min={0}
            required
          /></label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={destacado}
              onChange={() => setDestacado(!destacado)}
            />
            Destacado
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





