import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { SucursalesService } from "src/app/services/sucursales.service ";
import { Sucursal,CreateSucursalDTO } from "src/app/models/sucursal.model.";

@Component({
    selector: 'app-sucursales',
    templateUrl: './sucursales.component.html',
    styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  sucursal: Sucursal;
  sucursalDTO: CreateSucursalDTO = {nombre:"",ubicacion:""};

  // Inyectamos la clase Service y el módulo Router y Activated Route
  constructor(
    private modalService: NgbModal,
    private sucursalService: SucursalesService
  ) {}

  ngOnInit(): void {
    this.sucursalService
      .getSucursales()
      .subscribe((sucursales) => (this.sucursales = sucursales));
  }

  openMediumModal(mediumModalContent) {
    this.modalService.open(mediumModalContent);
  }

  create(): void {
    this.sucursalService
      .createSucursal(this.sucursalDTO)
      .subscribe((sucursal) => {
        swal.fire(
          "¡Sucursal creada!",
          `Sucursal ${sucursal.nombre} ha sido creada con éxito`,
          "success"
        );
      });
  }

  cargarProveedor(id): void {
    this.sucursalService
      .getProveedor(id)
      .subscribe((sucursal) => (this.sucursal = sucursal));
  }

  update(): void {
    this.sucursalService
      .updateProveedor(this.sucursal)
      .subscribe((sucursal) => {
        swal.fire(
          "Proveedor actualizado",
          `Proveedor ${sucursal.nombre} ha sido actualizado con éxito`,
          "success"
        );
      });
  }

  delete(sucursal: Sucursal): void {
    swal
      .fire({
        title: "Eliminar Proveedor",
        text: `¿Está seguro que desea eliminar ${sucursal.nombre} ${sucursal._id} de proveedores?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sucursalService
            .deleteProveedor(sucursal._id)
            .subscribe((response) => {
              // En esta línea hacemos que quite el cliente eliminado de la tabla sin tener que refrescar o llamar nuevamente al método listar
              this.sucursales = this.sucursales.filter(
                (pro) => pro !== sucursal
              );
              swal.fire(
                "Proveedor Eliminado",
                `Proveedor ${sucursal.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}

