import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProxPartidosComponent } from './prox-partidos/prox-partidos.component';
import { PartidosPasadosComponent } from './partidos-pasados/partidos-pasados.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'proxPartidos', component: ProxPartidosComponent
    },
    {
        path: 'partidosPasados', component: PartidosPasadosComponent
    }
];
