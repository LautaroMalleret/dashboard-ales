//definicion de un producto
// con sus propiedades y tipos
// y si es ropa o calzado, sus talles
// y si es ropa, su tipo de prenda
export type ProductoNuevo = Omit<Producto, "_id">;

export default interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  color: string;
  descripcion: string;
  tipo: 'ropa' | 'accesorio' | 'calzado'
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

