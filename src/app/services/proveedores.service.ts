import { Injectable } from "@angular/core";
import { Proveedor } from "../models/proveedor.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProveedoresService {
  private apiUrl = `http://35.175.121.46:4000/api/proveedores/`;

  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTlkMGU2NWM4MjliMDY5NWQ2ZmI3MSIsImlhdCI6MTYzODc5OTE3NiwiZXhwIjoxNjM4ODg1NTc2fQ.dueQSIETD9CXMVU5IqjOV3WTPpAtlhcVsxolhQ8Lyv4",
  });

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(map((response) => response as Proveedor[]));
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    // Después del post también se debe ingresar el tipo de objeto que retornará
    return this.http.post<Proveedor>(this.apiUrl, proveedor, {
      headers: this.httpHeaders,
    });
  }

  getProveedor(id: any): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}${id}`, {
      headers: this.httpHeaders,
    });
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `${this.apiUrl}/${proveedor.id}`,
      proveedor,
      { headers: this.httpHeaders }
    );
  }

  deleteProveedor(id: string): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.apiUrl}${id}`, {
      headers: this.httpHeaders,
    });
  }
}
