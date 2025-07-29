import { useState } from "react";
import InputNombre from "../../components/inputNombre";
import InputPrecio from "../../components/inputPrecio";
import InputColor from "../../components/inputColor";
import InputDescripcion from "../../components/inputDescripcion";
import InputStock from "../../components/inputStock";
import CheckboxDestacado from "../../components/checkDestacado";
import SelectTipoProducto from "../../components/selectTipoProducto";
import type { ProductoNuevo } from "../../types/producto";
import SelectorTalles from "../../components/selectorTalles";
import { agregarProducto } from "../../api/productosApi";
import { subirMultiplesImagenes } from "../../api/imagenesApi";
interface Props {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}
// modal para agregar un producto
// Este componente permite al usuario agregar un nuevo producto a la tienda
// Incluye campos para nombre, precio, color, descripción, tipo de producto, talles,
// tipo de prenda, imágenes, stock y si es destacado o no.
// Utiliza un formulario para capturar la información del producto y enviarla al servidor.
// También permite subir múltiples imágenes a través de la API de imgbb.
// Al enviar el formulario, se crea un objeto producto con la información ingresada
// y se envía una solicitud POST al servidor para agregar el producto a la base de datos
// Si la solicitud es exitosa, se llama a las funciones onSuccess y onClose pasadas como props.
export default function AgregarProducto({ token, onClose, onSuccess }: Props) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [color, setColor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<"ropa" | "accesorio" | "calzado">("ropa");
  const [talles, setTalles] = useState<string[]>([]);
  const [tipoPrenda, setTipoPrenda] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [destacado, setDestacado] = useState(false);
  const toggleTalle = (valor: string) => {
    setTalles((prev) =>
      prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
    );
  };

  // subir multiples imagenes a imgbb
  const manejarSubidaImagenes = async (files: FileList) => {
    setSubiendoImagen(true);
    try {
      const urls = await subirMultiplesImagenes(files);
      setImagenes((prev) => [...prev, ...urls]);
    } catch (err) {
      alert("Ocurrió un error al subir las imágenes.");
      console.log(err);
    }
    setSubiendoImagen(false);
  };

  // funcion para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //producto a enviar al servidor
    const producto: ProductoNuevo = {
      nombre,
      precio,
      color,
      descripcion,
      tipo,
      imagenes: imagenes,
      stock: stock ?? 0,
      destacado,
    };

    if (tipo === "ropa") {
      producto.ropa = {
        talle: talles,
        tipoPrenda,
      };
    }

    if (tipo === "calzado") {
      producto.calzado = {
        talle: talles,
      };
    }
    try {
      await agregarProducto(producto, token);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar el producto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
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

          <SelectTipoProducto
            tipo={tipo}
            tipoPrenda={tipoPrenda}
            onTipoChange={(e) =>
              setTipo(e.target.value as "ropa" | "accesorio" | "calzado")
            }
            onTipoPrendaChange={(e) => setTipoPrenda(e.target.value)}
          />

          {/* Talles */}
          {(tipo === "ropa" || tipo === "calzado") && (
            <SelectorTalles
              tipo={tipo}
              tallesSeleccionados={talles}
              toggleTalle={toggleTalle}
            />
          )}

          {/* IMAGENES */}
          <label className="block">
            Imagenes:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) manejarSubidaImagenes(e.target.files);
                // if (e.target.files) {
                //   subirMultiplesImagenes(e.target.files);
              }}
              className="w-full p-2 border rounded"
            />
          </label>
          {subiendoImagen && (
            <p className="text-sm text-gray-500">Subiendo imagen...</p>
          )}

          {imagenes.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagenes.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`imagen-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}

          <InputStock
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value === "" ? undefined : Number(e.target.value)
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
