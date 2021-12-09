import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Cliente } from "../models/cliente.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "src/app/services/token.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  private apiUrl = `${environment.API_URL}/api/clientes/`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(map((response) => response as Cliente[]));
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    // Después del post también se debe ingresar el tipo de objeto que retornará
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  getCliente(_id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}${_id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}${cliente._id}`, cliente);
  }

  deleteCliente(_id: string): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}${_id}`);
  }
}
