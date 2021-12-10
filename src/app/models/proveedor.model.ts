export interface Proveedor {
  _id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  tiendaId: string;
}

export interface ProveedorDTO extends Omit<Proveedor, '_id'>{

}
