import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioLogin } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioLogin("","");

  constructor(  private activatedRoute: ActivatedRoute,  private router: Router,private AuthService:AuthService,private tokenService: TokenService) { }

  ngOnInit(): void {
   

  }
login(){

  this.AuthService.login(this.usuario.email,this.usuario.password).subscribe(rta=>{})

  if ( this.tokenService.getToken()) {
  this.router.navigateByUrl('/procesos/venta');
  
}

}


}
