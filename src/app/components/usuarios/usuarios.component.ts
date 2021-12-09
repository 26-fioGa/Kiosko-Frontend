import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario,CreateUsuarioDTO } from 'src/app/models/usuario.model';
import { SucursalesService } from "src/app/services/sucursales.service ";
@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario= { _id:"", username:"", email:"", direccion:"",telefono:"", nombre:"", apellido:"", rol:"",tienda:"", createdAt:"", updatedAt:""};
  usuarioDTO: CreateUsuarioDTO= {  username:"", email:"",password:"", direccion:"",telefono:"", nombre:"", apellido:"", rol:"",tienda:""};
  modalTitle = ""

  // Inyectamos la clase Service y el módulo Router y Activated Route
  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
  this.getUsuarios()
  }
  getUsuarios():void{
    this.usuarioService
    .getUsuarios()
    .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  openMediumModal(mediumModalContent,title) {
    this.modalTitle = title;
    if (this.modalTitle == "Crear Usuario"){
      this.usuarioDTO = {  username:"", email:"",password:"", direccion:"",telefono:"", nombre:"", apellido:"", rol:"",tienda:""}
    }
    this.modalService.open(mediumModalContent);
  }
  /*getRol(id){
        if(id == "6199cc15f67003035d912bb8"){
            return "ADMIN"
        }else{
            return "USER"
        }
  }
  
  getSucursal(id){

    return this.sucursalService.getSucursal(id).subscribe((sucursal)=>sucursal.nombre)
 
}
*/
  create(): void {
    this.usuarioService
      .createUsuario(this.usuario)
      .subscribe((usuario) => {
        this.usuarios.push(usuario)
        swal.fire(
          "¡Usuario creado!",
          `El Usuario ${usuario.username} ha sido creado con éxito`,
          "success"
        );
      });
  }

  cargarUsuario(id): void {
    this.usuarioService
      .getUsuario(id)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  update(): void {
    this.usuarioService
      .updateUsuario(this.usuario)
      .subscribe((usuario) => {
        swal.fire(
          "Usuario actualizado",
          `El Usuario ha sido actualizado con éxito`,
          "success"
        );
      });
  }

  delete(usuario: Usuario): void {
    swal
      .fire({
        title: "Eliminar Usuario",
        text: `¿Está seguro que desea eliminar ${usuario.nombre} de usuarios?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService
            .deleteUsuario(usuario._id)
            .subscribe((response) => {
            this.usuarios = this.usuarios.filter(
                (pro) => pro !== usuario
              );
              swal.fire(
                "Usuario Eliminado",
                `El Usuario ${usuario.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}

