import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './paginas-estudiante/register/register.component';
import { ProxPartidosComponent } from './prox-partidos/prox-partidos.component';
import { PartidosPasadosComponent } from './partidos-pasados/partidos-pasados.component';
import { TablaResultadosComponent } from './paginas-estudiante/tabla-resultados/tabla-resultados.component';
import { PrediccionComponent } from './paginas-estudiante/prediccion/prediccion.component';
import { PerfilComponent } from './paginas-estudiante/perfil/perfil.component';
import { ReglamentoComponent } from './paginas-estudiante/reglamento/reglamento.component';
import { PaginaAdminComponent } from './paginas-admin/pagina-admin/pagina-admin.component';
import { IngresarResultComponent } from './paginas-admin/ingresar-result/ingresar-result.component';
import { authGuard } from './helpers/auth.guard';

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
        path: 'proxPartidos', component: ProxPartidosComponent, canActivate: [authGuard]
    },
    {
        path: 'partidosPasados', component: PartidosPasadosComponent, canActivate: [authGuard]
    },
    {
        path: 'resultados', component: TablaResultadosComponent, canActivate: [authGuard]
    },
    {
        path: 'prediccion/:id', component: PrediccionComponent, canActivate: [authGuard]
    },
    {
        path: 'perfil', component: PerfilComponent, canActivate: [authGuard]
    },
    {
        path: 'reglamento', component: ReglamentoComponent, canActivate: [authGuard]
    },
    {
        path: 'admin', component: PaginaAdminComponent, canActivate: [authGuard]
    },
    {
        path: 'resultado/:id', component: IngresarResultComponent, canActivate: [authGuard]
    }
];
