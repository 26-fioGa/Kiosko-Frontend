import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompraComponent } from "./listadoVentas/compra.component";
import { VentaComponent } from "./venta/venta.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "compra", component: CompraComponent },
  { path: "venta", component: VentaComponent },
];

@NgModule({
  declarations: [CompraComponent, VentaComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProcesosModule {}
