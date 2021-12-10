import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { Cliente,ClienteDTO } from "../../models/cliente.model";
import { ClientesService } from "../../services/clientes.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    _id:"",
    nombre: "",
    dni: "",
    direccion: "",
    telefono: "",
  };
  clienteDTO: ClienteDTO = {
    nombre: "",
    dni: "",
    direccion: "",
    telefono: "",
  };
  modalTitle:String;

  constructor(
    private modalService: NgbModal,
    private clienteService: ClientesService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  openMediumModal(mediumModalContent,title) {
    this.modalTitle = title;
    if (this.modalTitle == "Crear Cliente"){
      this.clienteDTO= {
        nombre: "",
        dni: "",
        direccion: "",
        telefono: "",
      };
    }
    this.modalService.open(mediumModalContent);
  }

  getClientes(): void {
    this.clienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  create(): void {
    this.clienteService.createCliente(this.clienteDTO).subscribe(() => {
      swal.fire(
        "¡Cliente creado!",
        `El cliente ha sido creado con éxito`,
        "success"
      );
    });
    this.getClientes();
    this.clienteDTO = {
      nombre: "",
      dni: "",
      direccion: "",
      telefono: "",
    };
  }

  cargarCliente(_id): void {
    this.clienteService.getCliente(_id).subscribe((cliente) => {
      this.clienteDTO = cliente;
      this.cliente._id = _id
    });
  }

  update(id): void {
    this.cliente._id = id;
    this.cliente.nombre =  this.clienteDTO.nombre; 
    this.cliente.direccion = this.clienteDTO.direccion
    this.cliente.dni = this.clienteDTO.dni
    this.cliente.telefono = this.clienteDTO.telefono

    this.clienteService.updateCliente(this.cliente).subscribe(() => {
      swal.fire(
        "Cliente actualizado",
        `Cliente actualizado con éxito`,
        "success"
      );
    });
    this.getClientes();
    this.cliente = {
      _id: "",
      nombre: "",
      dni: "",
      direccion: "",
      telefono: "",
    };
  }

  delete(cliente: Cliente): void {
    swal
      .fire({
        title: "Eliminar Cliente",
        text: `¿Está seguro que desea eliminar ${cliente.nombre} de clientes?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService
            .deleteCliente(cliente._id)
            .subscribe((response) => {
              this.clientes = this.clientes.filter((cli) => cli !== cliente);
              swal.fire(
                "Cliente Eliminado",
                `Cliente ${cliente.nombre} ha sido eliminado exitosamente`,
                "success"
              );
            });
        }
      });
  }
}
