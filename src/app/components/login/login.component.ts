import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioLogin } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioLogin("","");
  token = ""
  constructor(  private router: Router,private AuthService:AuthService,private tokenService: TokenService,private usuarioService:UsuariosService) { }

  ngOnInit(): void {
   
    try{
      this.usuarioService.getUsuarioLogeado().subscribe(usuario => {
        
        this.router.navigateByUrl('/procesos/venta')
      })
     
    }catch{
      this.router.navigateByUrl('/login')

    }
  }
login(){

  this.AuthService.login(this.usuario.email,this.usuario.password).subscribe(rta=>{  this.router.navigateByUrl('/procesos/venta');
})
}
}
