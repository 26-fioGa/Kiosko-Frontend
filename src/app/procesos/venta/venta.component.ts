import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { Venta } from "../../models/venta.model";

// Adicional models
import { Cliente } from "../../models/cliente.model";
import { Sucursal } from "src/app/models/sucursal.model";
import { Articulo } from "../../models/articulo.model";

import { VentasService } from "../../services/ventas.service";
// Adicional services
import { ClientesService } from "../../services/clientes.service";
import { SucursalesService } from "src/app/services/sucursales.service";
import { ArticulosService } from "../../services/articulos.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-venta",
  templateUrl: "./venta.component.html",
})
export class VentaComponent implements OnInit {
  venta: Venta = {
    hora: null,
    fecha: null,
    articulos: [],
    precioTotal: null,
    cajero: "",
    cliente: "",
    _id: "",
  };
  // adicionales
  clientes: Cliente[] = [];
  sucursales: Sucursal[] = [];
  articulos: Articulo[] = [];
  articulo: Articulo;
  precioTotal = 0;
  precioUnitario = 0;

  constructor(
    private ventaService: VentasService,
    private clienteService: ClientesService,
    private sucursalService: SucursalesService,
    private articuloService: ArticulosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClientes();
    this.getSucursales();
    this.getArticulos();
  }
  getClientes(): void {
    this.clienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }
  getSucursales(): void {
    this.sucursalService
      .getSucursales()
      .subscribe((sucursales) => (this.sucursales = sucursales));
  }
  getArticulos(): void {
    this.articuloService
      .getArticulos()
      .subscribe((articulos) => (this.articulos = articulos));
  }
  cargarArticulo(_id): void {
    this.articuloService.getArticulo(_id).subscribe((articulo) => {
      this.articulo = articulo;
      this.precioUnitario = articulo.costoVenta;
    });
  }
  create(): void {
    this.ventaService.createVenta(this.venta).subscribe(() => {
      swal.fire(
        "¡Venta creada!",
        `La venta ha sido registrada con éxito`,
        "success"
      );
    });

    this.venta = {
      hora: null,
      fecha: null,
      articulos: [],
      precioTotal: null,
      cajero: "",
      cliente: "",
      _id: "",
    };
  }

  createSale() {
    this.router.navigate(["/procesos/compra"]);
    swal.fire("¡Venta creada!", `La venta ha sido creado con éxito`, "success");
  }
}
