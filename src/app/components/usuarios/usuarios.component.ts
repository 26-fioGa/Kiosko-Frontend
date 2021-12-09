import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SucursalesService } from "src/app/services/sucursales.service ";
@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario;
  sucursalNombre = ""

  // Inyectamos la clase Service y el módulo Router y Activated Route
  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuariosService,private sucursalService: SucursalesService
  ) {}

  ngOnInit(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  openMediumModal(mediumModalContent) {
    this.modalService.open(mediumModalContent);
  }
  getRol(id){
        if(id == "6199cc15f67003035d912bb8"){
            return "ADMIN"
        }else{
            return "USER"
        }
  }
  /*
  getSucursal(id){

    return this.sucursalService.getSucursal(id).subscribe((sucursal)=>sucursal.nombre)
 
}
*/
  create(): void {
    this.usuarioService
      .createUsuario(this.usuario)
      .subscribe((usuario) => {
        swal.fire(
          "¡Proveedor creado!",
          `Proveedor ${usuario.nombre} ha sido creado con éxito`,
          "success"
        );
      });
  }

  cargarProveedor(id): void {
    this.usuarioService
      .getProveedor(id)
      .subscribe((usuario) => (this.usuario = usuario));
  }

  update(): void {
    this.usuarioService
      .updateProveedor(this.usuario)
      .subscribe((usuario) => {
        swal.fire(
          "Proveedor actualizado",
          `Proveedor ${usuario.nombre} ha sido actualizado con éxito`,
          "success"
        );
      });
  }

  delete(usuario: Usuario): void {
    swal
      .fire({
        title: "Eliminar Proveedor",
        text: `¿Está seguro que desea eliminar ${usuario.nombre} ${usuario._id} de proveedores?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService
            .deleteProveedor(usuario._id)
            .subscribe((response) => {
              // En esta línea hacemos que quite el cliente eliminado de la tabla sin tener que refrescar o llamar nuevamente al método listar
              this.usuarios = this.usuarios.filter(
                (pro) => pro !== usuario
              );
              swal.fire(
                "Proveedor Eliminado",
                `Proveedor ${usuario.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}

