import { Routes } from '@angular/router';
import { LoginComponet } from './component/login-componet/login-componet';
import { EstudiantesInicio } from './pages/estudiantes-inicio/estudiantes-inicio';
import { DocenteInicio } from './pages/docente-inicio/docente-inicio';
import { AdminInicio } from './pages/admin-inicio/admin-inicio';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { RoleRedirect } from './pages/role-redirect/role-redirect';
import { EstudiantesContenidoComponent } from './pages/estudiantes-contenido/estudiantes-contenido';
import { DocenteContenidoComponent } from './pages/docente-contenido/docente-contenido';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RoleRedirect
  },
  {
    path: 'login',
    component: LoginComponet
  },
  {
    path: 'estudiantes-inicio',
    component: EstudiantesInicio,
    canActivate: [authGuard]
  },
  {
    path: 'docente-inicio',
    component: DocenteInicio,
    canActivate: [authGuard]
  },
  {
    path: 'admin-inicio',
    component: AdminInicio,
    canActivate: [authGuard]
  },
  {
    path: 'admin-manage',
    loadComponent: () => import('./pages/admin-manage/admin-manage').then(m => m.AdminManage),
    canActivate: [authGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard]
  },
  {
    path: 'estudiantes-contenido/:id',
    component: EstudiantesContenidoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'docente-contenido/:id',
    component: DocenteContenidoComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
