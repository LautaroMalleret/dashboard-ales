export type TipoProducto = 'ropa' | 'accesorio' | 'calzado';

//definicion de un producto
// con sus propiedades y tipos
// y si es ropa o calzado, sus talles
// y si es ropa, su tipo de prenda
export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  color: string;
  descripcion: string;
  tipo: TipoProducto;
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
