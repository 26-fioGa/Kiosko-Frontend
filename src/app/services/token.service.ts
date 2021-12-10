import { Injectable } from "@angular/core";
import jwt_decode  from 'jwt-decode';
import { Token } from "../models/token.model";

@Injectable({
  providedIn: "root",
})
export class TokenService {

  constructor() {}
  saveToken(token,response){

    localStorage.setItem('token',token)
    localStorage.setItem('tienda',response[1].userFound.tienda[0])
    localStorage.setItem('username',response[1].userFound.username)
    localStorage.setItem('rol',response[1].userFound.rol[0]._id)
  }
  getToken(){
      const token = localStorage.getItem('token');
      return token;
  }
  getTienda(){
    const tienda = localStorage.getItem('tienda');
    return tienda
  }
  getUsername(){
    const username = localStorage.getItem('username');
    return username
  }
  getRol(){
    const rol = localStorage.getItem('rol');
    return rol
  }
  getPayload(){
    const token = localStorage.getItem('token');
    const decoded = jwt_decode<Token>(token)
 return decoded;

  }
  destroyToken(){
    localStorage.removeItem('token')
    localStorage.removeItem('tienda')
    localStorage.removeItem('username')
    localStorage.removeItem('rol')
    
  }
}
