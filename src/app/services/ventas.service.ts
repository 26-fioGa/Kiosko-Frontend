import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Venta } from "../models/venta.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "src/app/services/token.service";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class VentasService {
  private apiUrl = `${environment.API_URL}/api/ventas/`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getVentas(): Observable<Venta[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(map((response) => response as Venta[]));
  }

  createVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  getVenta(_id: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}${_id}`);
  }

  updateVenta(venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}${venta._id}`, venta);
  }

  deleteVenta(_id: string): Observable<Venta> {
    return this.http.delete<Venta>(`${this.apiUrl}${_id}`);
  }
}
