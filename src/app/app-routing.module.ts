import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    //6199cc15f67003035d912bb7 comon user
    { path: 'usuarios', component: UsuariosComponent,canActivate:[AuthGuard],data: {roles:'6199cc15f67003035d912bb8'} },
    { path: 'proveedores', component: ProveedoresComponent,canActivate:[AuthGuard],data: {roles:'6199cc15f67003035d912bb8'} },
    { path: 'clientes', component: ClientesComponent,canActivate:[AuthGuard],data: {roles:'6199cc15f67003035d912bb8'}  },
    { path: 'sucursales', component: SucursalesComponent,canActivate:[AuthGuard],data: {roles:'6199cc15f67003035d912bb8'}  },
    { path: 'items', component: ItemsComponent },
    {
        path: 'procesos',
        loadChildren: () =>
            import ('./procesos/procesos.module').then(m => m.ProcesosModule)
    },
    {
        path: 'basic-ui',
        loadChildren: () =>
            import ('./basic-ui/basic-ui.module').then(m => m.BasicUiModule)
    },
    {
        path: 'charts',
        loadChildren: () =>
            import ('./charts/charts.module').then(m => m.ChartsDemoModule)
    },
    {
        path: 'forms',
        loadChildren: () =>
            import ('./forms/form.module').then(m => m.FormModule)
    },
    {
        path: 'tables',
        loadChildren: () =>
            import ('./tables/tables.module').then(m => m.TablesModule)
    },
    {
        path: 'icons',
        loadChildren: () =>
            import ('./icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'general-pages',
        loadChildren: () =>
            import ('./general-pages/general-pages.module').then(m => m.GeneralPagesModule)
    },
    {
        path: 'apps',
        loadChildren: () =>
            import ('./apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'user-pages',
        loadChildren: () =>
            import ('./user-pages/user-pages.module').then(m => m.UserPagesModule)
    },
    {
        path: 'error-pages',
        loadChildren: () =>
            import ('./error-pages/error-pages.module').then(m => m.ErrorPagesModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}