import { useState } from "react";

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
// El componente maneja el estado de los campos del formulario y la subida de imágenes.
// Al enviar el formulario, se crea un objeto producto con la información ingresada
// y se envía una solicitud POST al servidor para agregar el producto a la base de datos
// Si la solicitud es exitosa, se llama a las funciones onSuccess y onClose pasadas como props.
// Si ocurre un error, se muestra un mensaje de alerta al usuario.
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
  const tallesRopa = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  // Talles de calzado del 34 al 44
  const tallesCalzado = Array.from({ length: 11 }, (_, i) =>
    (34 + i).toString()
  );
// funcion para alternar talles seleccionados
  const toggleTalle = (valor: string) => {
    setTalles((prev) =>
      prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]
    );
  };

  // subir multiples imagenes a imgbb
  const subirMultiplesImagenes = async (files: FileList) => {
    setSubiendoImagen(true);
    const nuevasUrls: string[] = [];

    for (const file of Array.from(files)) { // Convertir FileList a Array
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=4c25d83bda641c6425e5ecd54e3e8d37`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          nuevasUrls.push(data.data.url);
        } else {
          alert(`Error al subir una imagen: ${file.name}`);
        }
      } catch (err) {
        console.error(err);
        alert(`Fallo al subir ${file.name}`);
      }
    }

    // Agregar las nuevas URLs al estado de imagenes
    setImagenes((prev) => [...prev, ...nuevasUrls]);
    setSubiendoImagen(false);
  };

  // funcion para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    interface Producto {
      nombre: string;
      precio: number;
      color: string;
      descripcion: string;
      tipo: "ropa" | "accesorio" | "calzado";
      // imagenUrl: string;
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
//producto a enviar al servidor
    const producto: Producto = {
      nombre,
      precio,
      color,
      descripcion,
      tipo,
      // imagenUrl,
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producto),
      });

      if (!res.ok) throw new Error("Error al agregar producto");

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
          <label className="block">
            Nombre:
            <input
              type="text"
              placeholder="Ingrese el Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="block">
            Precio:
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Colores Disponibles:
            <input
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Descripción:
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Tipo de producto:
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value as "ropa" | "accesorio" | "calzado");
                setTalles([]);
                setTipoPrenda("");
              }}
              className="w-full p-2 border rounded"
              required
            >
              <option value="ropa">Ropa</option>
              <option value="accesorio">Accesorio</option>
              <option value="calzado">Calzado</option>
            </select>
          </label>

          {/* Talles */}

          {/* ROPA */}
          {/* Mostrar talles solo si el tipo es ropa o calzado */}
          {tipo === "ropa" && (
            <>
              <label className="block">
                Talles disponibles:
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
                </div>
              </label>
              <label className="block">
                Tipo de prenda:
                <select
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Seleccioná tipo de prenda
                  </option>
                  <option value="remera">Remera</option>
                  <option value="pantalón">Pantalón</option>
                  <option value="buzo">Buzo</option>
                  <option value="campera">Campera</option>
                  <option value="ropa interior">Ropa interior</option>
                </select>
              </label>
            </>
          )}

          {/* CALZADO */}
          {tipo === "calzado" && (
            <>
              <label className="block">
                Talles disponibles:
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
              </label>
            </>
          )}

          {/* IMAGENES */}
          <label className="block">
            Imagenes:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  subirMultiplesImagenes(e.target.files);
                }
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

          <label className="block">
            Stock disponible:
            <input
              type="number"
              value={stock === undefined ? "" : stock}
              onChange={(e) =>
                setStock(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
              placeholder="Stock disponible"
              min={0}
              required
            />
          </label>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
