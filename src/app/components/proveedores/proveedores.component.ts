import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { Proveedor } from "../../models/proveedor.model";
import { ProveedoresService } from "../../services/proveedores.service";

@Component({
  selector: "app-proveedores",
  templateUrl: "./proveedores.component.html",
  styleUrls: ["./proveedores.component.scss"],
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedor: Proveedor;

  // Inyectamos la clase Service y el módulo Router y Activated Route
  constructor(
    private modalService: NgbModal,
    private proveedorService: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  openMediumModal(mediumModalContent) {
    this.modalService.open(mediumModalContent);
  }

  getProveedores(): void {
    this.proveedorService
      .getProveedores()
      .subscribe((proveedores) => (this.proveedores = proveedores));
  }

  create(): void {
    this.proveedorService.createProveedor(this.proveedor).subscribe(() => {
      swal.fire(
        "¡Proveedor creado!",
        `El proveedor ha sido creado con éxito`,
        "success"
      );
    });
    this.getProveedores();
    this.proveedor = new Proveedor();
  }

  cargarProveedor(_id): void {
    this.proveedorService.getProveedor(_id).subscribe((proveedor) => {
      this.proveedor = proveedor;
      console.log(this.proveedor);
    });
  }

  update(): void {
    this.proveedorService.updateProveedor(this.proveedor).subscribe(() => {
      swal.fire(
        "Proveedor actualizado",
        `Proveedor actualizado con éxito`,
        "success"
      );
    });
    this.getProveedores();
    this.proveedor = new Proveedor();
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
              // En esta línea hacemos que quite el cliente eliminado de la tabla sin tener que refrescar o llamar nuevamente al método listar
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
