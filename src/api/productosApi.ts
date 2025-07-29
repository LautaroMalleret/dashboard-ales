// src/api/productosApi.ts
import type Producto from "../types/producto";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function agregarProducto(
  producto: Partial<Producto>,
  token: string
): Promise<Producto> {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) throw new Error("Error al agregar producto");

  return res.json();
}

export async function editarProducto(
  id: string,
  actualizado: Partial<Producto>,
  token: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(actualizado),
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
}

export async function eliminarProducto(
  id: string,
  token: string
): Promise<void> {
  const confirmacion = confirm(
    "¿Estás seguro que querés eliminar este producto?"
  );
  if (!confirmacion) return;
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
}


interface FiltrosProducto {
  tipo?: string;
  tipoPrenda?: string;
  nombre?: string;
}

export const obtenerProductos = async (
  token: string,
  filtros: FiltrosProducto = {}
): Promise<Producto[]> => {
  const query = new URLSearchParams();

  if (filtros.tipo) query.append("tipo", filtros.tipo);
  if (filtros.tipo === "ropa" && filtros.tipoPrenda) {
    query.append("tipoPrenda", filtros.tipoPrenda);
  }
  if (filtros.nombre?.trim()) query.append("nombre", filtros.nombre.trim());

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/productos?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Error al obtener productos");

  return await res.json();
};
