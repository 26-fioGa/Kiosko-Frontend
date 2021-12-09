export interface Sucursal {
  _id: string;
  nombre: string;
  ubicacion: string;
 
}

export interface CreateSucursalDTO extends Omit<Sucursal, '_id'>{
  
}