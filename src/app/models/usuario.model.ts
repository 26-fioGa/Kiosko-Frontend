export interface Usuario {
  _id: string;
  username: string;
  email: string;
  direccion: string;
  telefono: string;
  nombre: string;
  apellido: string;
  rol: string[];
  tienda: string[];
  createdAt: string;
  updatedAt: string;
}

export class UsuarioLogin {

  constructor(
    public email: string,
    public password: string,
   
) { }
}

export interface CreateUsuarioDTO extends Omit<Usuario, '_id'|'createdAt'|'updatedAt'>{
  password: string;
}

export interface CreatedUsuarioDTO extends Omit<Usuario, 'createdAt'|'updatedAt'|'password'>{

}