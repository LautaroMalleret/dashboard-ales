import { useState } from "react";
import InputNombre from "../../components/inputNombre";
import InputPrecio from "../../components/inputPrecio";
import InputColor from "../../components/inputColor";
import InputDescripcion from "../../components/inputDescripcion";
import InputStock from "../../components/inputStock";
import CheckboxDestacado from "../../components/checkDestacado";
import SelectorTalles from "../../components/selectorTalles";
import type Producto from "../../types/producto";
import { editarProducto } from "../../api/productosApi";
//modal para editar un producto
//muestra un formulario con los datos del producto
//y permite editarlo y guardarlo

interface Props {
  producto: Producto;
  token: string;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditarProductoModal({
  producto,
  token,
  onClose,
  onUpdate,
}: Props) {
  // Estados locales para manejar los campos del formulario
  // Inicializa los estados con los valores del producto que se está editando
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [color, setColor] = useState(producto.color);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [imagenes, setImagenes] = useState<string[]>(producto.imagenes);
  const [stock, setStock] = useState<number | undefined>(producto.stock);
  const [destacado, setDestacado] = useState(producto.destacado);
  const [talles, setTalles] = useState<string[]>(
    producto.ropa?.talle || producto.calzado?.talle.map(String) || []
  );
  const [tipoPrenda] = useState(producto.ropa?.tipoPrenda || "");
  const toggleTalle = (valor: string) => {
    setTalles((prev) =>
      prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
    );
  };
  const eliminarImagen = (url: string) => {
    setImagenes((prev) => prev.filter((img) => img !== url));
  };

  // Función para manejar el envío del formulario
  // Crea un objeto con los datos del producto actualizado y lo envía a la API
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
      await editarProducto(producto._id, actualizado, token);
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
          <InputNombre
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <InputPrecio
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
          />

          <InputColor
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <InputDescripcion
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {(producto.tipo === "ropa" || producto.tipo === "calzado") && (
            <SelectorTalles
              tipo={producto.tipo}
              tallesSeleccionados={talles}
              toggleTalle={toggleTalle}
            />
          )}

          <label className="block">Imagenes:</label>
          {imagenes.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagenes.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} alt={`imagen-${idx}`} className="w-20 h-20 object-cover rounded"/>
                  <button
                    type="button"
                    onClick={() => eliminarImagen(url)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                    title="Eliminar imagen"
                  >×</button>
                </div>
              ))}
            </div>
          )}

          <InputStock
            value={stock}
            onChange={(e) =>
              setStock(e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />

          <CheckboxDestacado
            checked={destacado}
            onChange={() => setDestacado(!destacado)}
          />

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
