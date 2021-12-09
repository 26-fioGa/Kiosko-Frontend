import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { SucursalesService } from "src/app/services/sucursales.service";
import { Sucursal, CreateSucursalDTO } from "src/app/models/sucursal.model";

@Component({
    selector: 'app-sucursales',
    templateUrl: './sucursales.component.html',
    styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  sucursal: Sucursal={_id:"",nombre:"",ubicacion:""};
  sucursalDTO: CreateSucursalDTO = {nombre:"",ubicacion:""};
  modalTitle:String;

  // Inyectamos la clase Service y el módulo Router y Activated Route
  constructor(
    private modalService: NgbModal,
    private sucursalService: SucursalesService
  ) {}

  ngOnInit(): void {
  this.getSucursales()
  }
  getSucursales():void{
    this.sucursalService
    .getSucursales()
    .subscribe((sucursales) => (this.sucursales = sucursales));
  }

  openMediumModal(mediumModalContent, title) {
    this.modalTitle = title;
    if (this.modalTitle == "Crear Sucursal"){
      this.sucursalDTO = {
        nombre: "",
        ubicacion: "",
      };
    }
    this.modalService.open(mediumModalContent);
  }

  create(): void {
    this.sucursalService
      .createSucursal(this.sucursalDTO)
      .subscribe((sucursal) => {
        this.sucursales.push(sucursal)
        swal.fire(
          "¡Sucursal creada!",
          `Sucursal ${sucursal.nombre} ha sido creada con éxito`,
          "success"
        );
      });
  }
  

  cargarSucursal(id): void {
    this.sucursalService
      .getSucursal(id)
      .subscribe((sucursal) => {this.sucursalDTO = sucursal;this.sucursal._id = id});
  }

  update(id): void {
    this.sucursal._id = id; this.sucursal.nombre = this.sucursalDTO.nombre; this.sucursal.ubicacion = this.sucursalDTO.ubicacion
    this.sucursalService
      .updateSucursal(this.sucursal)
      .subscribe((sucursal1) => {
        swal.fire(
          "Sucursal actualizada",
          `Sucursal ha sido actualizada con éxito`,
          "success"
        );
      });
this.sucursal ={_id:"",nombre:"",ubicacion:""};
this.sucursalDTO = {nombre:"",ubicacion:""};

      this.getSucursales()
  }

  delete(sucursal: Sucursal): void {
    swal
      .fire({
        title: "Eliminar Sucursal",
        text: `¿Está seguro que desea eliminar ${sucursal.nombre} de las sucursales?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sucursalService
            .deleteSucursal(sucursal._id)
            .subscribe(() => {
            this.sucursales = this.sucursales.filter(
                (pro) => pro !== sucursal
              );
              swal.fire(
                "Sucursal Eliminada",
                `La Sucursal ${sucursal.nombre} ha sido eliminada exitosamente`,
                "success"
              );
            });
        }
      });
  }
}

