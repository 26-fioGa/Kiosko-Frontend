import { Injectable } from "@angular/core";
import jwt_decode  from 'jwt-decode';
import { Token } from "../models/token.model";

@Injectable({
  providedIn: "root",
})
export class TokenService {

  constructor() {}
  saveToken(token: string){
    localStorage.setItem('token',token)
  }
  getToken(){
      const token = localStorage.getItem('token');
      return token;
  }
  getPayload(){
    const token = localStorage.getItem('token');
    const decoded = jwt_decode<Token>(token)
 return decoded;
      

    
  }

}
