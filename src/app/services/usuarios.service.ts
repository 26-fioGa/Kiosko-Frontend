import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario.model";
import { Observable } from "rxjs";
import { TokenService } from 'src/app/services/token.service';

@Injectable({
    providedIn: "root",
  })
  export class UsuariosService {
    private apiUrl = `${environment.API_URL}/api/users`;
    constructor(private http: HttpClient,private tokenService:TokenService) {}
    getAll(){
        return this.http.get<Usuario[]>(this.apiUrl);
    }
    getUsuarioLogeado() {
      
      return this.http.get<Usuario>(`${this.apiUrl}/${this.tokenService.getPayload().id}`);
    }
  }
