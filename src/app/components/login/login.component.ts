import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

token = '';

  constructor(  private activatedRoute: ActivatedRoute,  private router: Router,private AuthService:AuthService) { }

  //routerLink="/procesos/venta"

  ngOnInit(): void {
   

  }
login(){
  this.AuthService.login('admin1@gmail.com','12345678').subscribe(rta=>{this.token =rta.token})
  if ( !this.token ) {
  this.router.navigateByUrl('/procesos/venta');
  
}
}
}
