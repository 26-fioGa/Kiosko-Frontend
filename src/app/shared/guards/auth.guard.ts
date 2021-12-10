import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public roles = ""
  public access = false
  constructor(private usuarioService:UsuariosService, private router:Router, private tokenService:TokenService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     const rol1 = route.data['roles'];
  
    try{
        this.roles = this.tokenService.getRol()
        if (  this.roles == rol1){
          this.access = true
       
    }else{
      this.router.navigateByUrl('/login');
      this.access = false
    }      
    }catch{
      this.router.navigateByUrl('/login');
      return false
    } 
    return this.access
  }
 
}
