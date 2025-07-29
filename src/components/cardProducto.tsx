import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import type Producto  from "../types/producto";

type Props = {
  producto: Producto;
  onEditar: (producto: Producto) => void;
  onEliminar: (id: string) => void;
};

const ProductoCard: React.FC<Props> = ({ producto, onEditar, onEliminar }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold text-lg">{producto.nombre}</h2>
        <p className="text-sm text-gray-600">
          ${producto.precio} • {producto.tipo} • Stock: {producto.stock}
        </p>
        {producto.destacado && (
          <span className="text-green-600 text-xs font-semibold">
            Destacado
          </span>
        )}
      </div>
      <div className="mt-2 sm:mt-0 flex gap-2">
        <button
          onClick={() => onEditar(producto)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <Pencil size={18} /> Editar
        </button>
        <button
          onClick={() => onEliminar(producto._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <Trash2 size={18} /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
