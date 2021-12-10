import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { Articulo,ArticuloDTO } from "../../models/articulo.model";
import { ArticulosService } from "../../services/articulos.service";

@Component({
  selector: "app-inventario",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  articulos: Articulo[] = [];
  articulo: Articulo={
    _id:"",
    cantidad: 0,
    costoVenta: 0,
    costoCompra: 0,
    descripcion: "",
    nombre: "",
    perecero: Date,
    tienda: "",
    usuario: "",
  }
  articuloDTO: ArticuloDTO = {
    cantidad: 0,
    costoVenta: 0,
    costoCompra: 0,
    descripcion: "",
    nombre: "",
    perecero: Date,
    tienda: "",
    usuario: "",
  };
  modalTitle:String;
  constructor(
    private modalService: NgbModal,
    private articuloService: ArticulosService
  ) {}

  ngOnInit(): void {
    this.getArticulos();
  }
  openMediumModal(mediumModalContent,title) {
    this.modalTitle = title;
    if (this.modalTitle == "Crear Articulo"){
      this.articuloDTO= {
        cantidad: 0,
        costoVenta: 0,
        costoCompra: 0,
        descripcion: "",
        nombre: "",
        perecero: Date,
        tienda: "",
        usuario: "",
      };
    }
    this.modalService.open(mediumModalContent);
  }

  getArticulos(): void {
    this.articuloService
      .getArticulos()
      .subscribe((articulos) => (this.articulos = articulos));
  }

  create(): void {
    this.articuloService.createArticulo(this.articulo).subscribe(() => {
      swal.fire(
        "¡Artículo creado!",
        `El artículo ha sido creado con éxito`,
        "success"
      );
    });
    this.getArticulos();
    this.articuloDTO = {
      cantidad: 0,
      costoVenta: 0,
      costoCompra: 0,
      descripcion: "",
      nombre: "",
      perecero: Date,
      tienda: "",
      usuario: "",
    };
  }

  cargarArticulo(_id): void {
    this.articuloService.getArticulo(_id).subscribe((articulo) => {
      this.articulo = articulo;
    });
  }

  update(): void {
    this.articuloService.updateArticulo(this.articulo).subscribe(() => {
      swal.fire(
        "Artículo actualizado",
        `Artículo actualizado con éxito`,
        "success"
      );
    });
    this.articulo = {
      _id: "",
      cantidad: 0,
      costoVenta: 0,
      costoCompra: 0,
      descripcion: "",
      nombre: "",
      perecero: Date,
      tienda: "",
      usuario: "",
    };
    this.getArticulos();
  }

  delete(articulo: Articulo): void {
    swal
      .fire({
        title: "Eliminar Artículo",
        text: `¿Está seguro que desea eliminar ${articulo.nombre} de artículos?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.articuloService
            .deleteArticulo(articulo._id)
            .subscribe((response) => {
              this.articulos = this.articulos.filter((art) => art !== articulo);
              swal.fire(
                " Artículo Eliminado",
                `Artículo ${articulo.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}
