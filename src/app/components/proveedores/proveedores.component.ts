import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { Proveedor,ProveedorDTO } from "../../models/proveedor.model";
import { ProveedoresService } from "../../services/proveedores.service";
import { TokenService } from "src/app/services/token.service";
@Component({
  selector: "app-proveedores",
  templateUrl: "./proveedores.component.html",
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorDTO:ProveedorDTO = {
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    email: "",
    tiendaId: "",
  }
  proveedor: Proveedor = {
    _id:"",
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    email: "",
    tiendaId: "",
  };
  modalTitle:String;

  constructor(
    private modalService: NgbModal,
    private proveedorService: ProveedoresService, private tokenService:TokenService
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  openMediumModal(mediumModalContent,title) {
    this.modalTitle = title;
    if (this.modalTitle == "Crear Proveedor"){
      this.proveedorDTO= {
        nombre: "",
        ruc: "",
        direccion: "",
        telefono: "",
        email: "",
        tiendaId: "",
      };
    }
    this.modalService.open(mediumModalContent);
  }

  getProveedores(): void {
    this.proveedorService
      .getProveedores()
      .subscribe((proveedores) => (this.proveedores = proveedores));
  }

  create(): void {
    this.proveedorDTO.tiendaId = this.tokenService.getTienda()
    this.proveedorService.createProveedor(this.proveedorDTO).subscribe(() => {
      swal.fire(
        "¡Proveedor creado!",
        `El proveedor ha sido creado con éxito`,
        "success"
      );
    });
    this.getProveedores();
    this.proveedorDTO = {
      nombre: "",
      ruc: "",
      direccion: "",
      telefono: "",
      email: "",
      tiendaId: "",
    };
  }

  cargarProveedor(_id): void {
    this.proveedorService.getProveedor(_id).subscribe((proveedor) => {
      this.proveedorDTO = proveedor;
      this.proveedor._id = _id
    });
  }

  update(id): void {

    this.proveedor._id = id;
    this.proveedor.nombre =  this.proveedorDTO.nombre; 
    this.proveedor.ruc =  this.proveedorDTO.ruc; 
    this.proveedor.direccion = this.proveedorDTO.direccion
    this.proveedor.telefono = this.proveedorDTO.telefono
    this.proveedor.email = this.proveedorDTO.email
    this.proveedor.tiendaId = this.tokenService.getTienda()

    this.proveedorService.updateProveedor(this.proveedor).subscribe(() => {
      swal.fire(
        "Proveedor actualizado",
        `Proveedor actualizado con éxito`,
        "success"
      );
    });
    this.getProveedores();
    this.proveedor = {
      _id: "",
      nombre: "",
      ruc: "",
      direccion: "",
      telefono: "",
      email: "",
      tiendaId: "",
    };

  }

  delete(proveedor: Proveedor): void {
    swal
      .fire({
        title: "Eliminar Proveedor",
        text: `¿Está seguro que desea eliminar ${proveedor.nombre} de proveedores?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.proveedorService
            .deleteProveedor(proveedor._id)
            .subscribe((response) => {
              this.proveedores = this.proveedores.filter(
                (pro) => pro !== proveedor
              );
              swal.fire(
                "Proveedor Eliminado",
                `Proveedor ${proveedor.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}
