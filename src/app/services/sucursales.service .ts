import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Sucursal,CreateSucursalDTO } from "../models/sucursal.model.";
import { Observable } from "rxjs";
import { TokenService } from 'src/app/services/token.service';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
  })
  export class SucursalesService {
    private apiUrl = `${environment.API_URL}/api/tiendas`;
    constructor(private http: HttpClient,private tokenService:TokenService) {}

    getSucursales(): Observable<Sucursal[]>{
        return this.http.get<Sucursal[]>(this.apiUrl).pipe(map((response)=>response as Sucursal[]))
    }

    createSucursal(sucursal: CreateSucursalDTO) {
      // Después del post también se debe ingresar el tipo de objeto que retornará
      return this.http.post<Sucursal>(this.apiUrl, sucursal);
    }
  
    getSucursal(id: any): Observable<Sucursal> {
      return this.http.get<Sucursal>(`${this.apiUrl}/${id}`);
    }
  
    updateProveedor(sucursal: Sucursal): Observable<Sucursal> {
      return this.http.put<Sucursal>(
        `${this.apiUrl}/${sucursal._id}`,
        sucursal
      
      );
    }
  
    deleteProveedor(id: string): Observable<Sucursal> {
      return this.http.delete<Sucursal>(`${this.apiUrl}${id}`);
    }
  }
