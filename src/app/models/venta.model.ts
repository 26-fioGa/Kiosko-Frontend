export interface Venta {
  _id: string;
  hora: any;
  fecha: any;
  articulos: [];
  precioTotal: number;
  cajero: string; // usuario
  cliente: string;
}
