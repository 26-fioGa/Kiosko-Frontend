import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario,CreateUsuarioDTO } from "../models/usuario.model";
import { Observable } from "rxjs";
import { TokenService } from 'src/app/services/token.service';
import { map } from "rxjs/operators";


@Injectable({
    providedIn: "root",
  })
  export class UsuariosService {
    private apiUrl = `${environment.API_URL}/api/users`;
    constructor(private http: HttpClient,private tokenService:TokenService) {}

    getUsuarios(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.apiUrl).pipe(map((response)=>response as Usuario[]))
    }

    getUsuarioLogeado(): Observable<Usuario> {
      
      return this.http.get<Usuario>(`${this.apiUrl}/${this.tokenService.getPayload().id}`);
    }
  
    createUsuario(usuario: CreateUsuarioDTO): Observable<Usuario> {
      // Después del post también se debe ingresar el tipo de objeto que retornará
      return this.http.post<Usuario>(this.apiUrl, usuario);
    }
  
    getUsuario(id: any): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }
  
    updateUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.put<Usuario>(
        `${this.apiUrl}/${usuario._id}`,
        usuario
      );
    }
  
    deleteUsuario(id: string): Observable<Usuario> {
      return this.http.delete<Usuario>(`${this.apiUrl}/${id}`);
    }
  }
