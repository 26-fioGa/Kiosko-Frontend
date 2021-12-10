import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth.model";
import { tap } from "rxjs/operators";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api`;
  constructor(private http: HttpClient, private tokenService:TokenService) {}
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/auth/signin`, { email, password }).pipe(tap(response => this.tokenService.saveToken(response[0].token,response)));
  }
  
  //en proceso
  profile(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/users`, { email, password });
  }
 
}
