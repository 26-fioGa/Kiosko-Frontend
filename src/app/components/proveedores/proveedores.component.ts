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
  proveedor: Proveedor = {
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    email: "",
    tiendaId: "",
  };

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
    this.proveedor = {
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
      this.proveedor = proveedor;
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
    this.proveedor = {
      _id: "",
      nombre: "",
      ruc: "",
      direccion: "",
      telefono: "",
      email: "",
      tiendaId: "",
    };
    this.getProveedores();
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
