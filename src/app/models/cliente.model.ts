export interface Cliente {
  _id: string;
  nombre: string;
  dni: string;
  direccion: string;
  telefono: string;
}

export interface ClienteDTO extends Omit<Cliente, '_id'>{

}
