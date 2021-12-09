import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Articulo } from "../models/articulo.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "src/app/services/token.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArticulosService {
  private apiUrl = `${environment.API_URL}/api/articulos/`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getArticulos(): Observable<Articulo[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(map((response) => response as Articulo[]));
  }

  createArticulo(articulo: Articulo): Observable<Articulo> {
    // Después del post también se debe ingresar el tipo de objeto que retornará
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  getArticulo(_id: string): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}${_id}`);
  }

  updateArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}${articulo._id}`, articulo);
  }

  deleteArticulo(_id: string): Observable<Articulo> {
    return this.http.delete<Articulo>(`${this.apiUrl}${_id}`);
  }
}
