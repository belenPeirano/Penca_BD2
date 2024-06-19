import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './paginas-estudiante/register/register.component';
import { ProxPartidosComponent } from './prox-partidos/prox-partidos.component';
import { PartidosPasadosComponent } from './partidos-pasados/partidos-pasados.component';
import { TablaResultadosComponent } from './paginas-estudiante/tabla-resultados/tabla-resultados.component';
import { PrediccionComponent } from './paginas-estudiante/prediccion/prediccion.component';
import { PerfilComponent } from './paginas-estudiante/perfil/perfil.component';

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
    },
    {
        path: 'resultados', component: TablaResultadosComponent
    },
    {
        path: 'prediccion/:id', component: PrediccionComponent
    },
    {
        path: 'perfil', component: PerfilComponent
    }
];
