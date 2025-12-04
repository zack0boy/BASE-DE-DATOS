import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { PrincipalPage } from './pages/principal-page/principal-page';
import { CarreraPage } from './pages/carrera-page/carrera-page';
export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'principal', component: PrincipalPage },
  {path: 'carrera', component: CarreraPage}
];
