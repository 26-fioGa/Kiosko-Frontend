export interface Usuario {
  _id: string;
  username: string;
  email: string;
  direccion: string;
  telefono: string;
  nombre: string;
  apellido: string;
  rol: string;
  tienda: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UsuarioLogin {

  constructor(
    public email: string,
    public password: string,
   
) { }
}
