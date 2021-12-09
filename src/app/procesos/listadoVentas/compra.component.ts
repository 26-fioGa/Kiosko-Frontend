import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { Venta } from "../../models/venta.model";
import { VentasService } from "../../services/ventas.service";

@Component({
  selector: "app-compra",
  templateUrl: "./compra.component.html",
})
export class CompraComponent implements OnInit {
  ventas: Venta[] = [];
  venta: Venta = {
    hora: null,
    fecha: null,
    articulos: [],
    precioTotal: null,
    cajero: "",
    cliente: "",
    _id: "",
  };
  constructor(private ventaService: VentasService) {}

  ngOnInit(): void {
    this.getVentas();
  }
  getVentas(): void {
    this.ventaService.getVentas().subscribe((ventas) => (this.ventas = ventas));
  }

  delete(venta: Venta): void {
    swal
      .fire({
        title: "Eliminar Venta",
        text: `¿Está seguro que desea eliminar la venta de precio total ${venta.precioTotal}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ventaService.deleteVenta(venta._id).subscribe((response) => {
            this.ventas = this.ventas.filter((ven) => ven !== venta);
            swal.fire(
              " Venta Eliminada",
              `Venta de monto ${venta.precioTotal} ha sido eliminado exitosamente`,
              "success"
            );
          });
        }
      });
  }
}
