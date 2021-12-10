import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Proveedor,ProveedorDTO } from "../models/proveedor.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "src/app/services/token.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProveedoresService {
  private apiUrl = `${environment.API_URL}/api/proveedores/`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(map((response) => response as Proveedor[]));
  }

  createProveedor(proveedor: ProveedorDTO): Observable<Proveedor> {
    // Después del post también se debe ingresar el tipo de objeto que retornará
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  getProveedor(_id: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}${_id}`);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `${this.apiUrl}${proveedor._id}`,
      proveedor
    );
  }

  deleteProveedor(_id: string): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.apiUrl}${_id}`);
  }
}
