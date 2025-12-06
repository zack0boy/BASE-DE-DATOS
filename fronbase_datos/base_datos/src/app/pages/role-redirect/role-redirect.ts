import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Constantes de roles del backend
const ROLE_STUDENT = 41;      // ESTUDIANTE
const ROLE_DOCENTE = 42;      // DOCENTE
const ROLE_SECRETARIA = 43;   // SECRETARIA
const ROLE_DIRECTOR = 44;     // DIRECTOR
const ROLE_ADMIN = 45;        // ADMIN

@Component({
  selector: 'app-role-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `<div></div>`
})
export class RoleRedirect implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const role = user.role || user.id_rol || user.role_id || null;
    const numRole = Number(role);

    console.log('RoleRedirect - Usuario:', user.name, 'Rol:', numRole);

    // ADMIN, SECRETARIA, DIRECTOR -> admin-inicio
    if (numRole === ROLE_ADMIN || numRole === ROLE_SECRETARIA || numRole === ROLE_DIRECTOR) {
      console.log('Redirigiendo a admin-inicio');
      this.router.navigate(['/admin-inicio']);
    }
    // DOCENTE -> docente-inicio
    else if (numRole === ROLE_DOCENTE) {
      console.log('Redirigiendo a docente-inicio');
      this.router.navigate(['/docente-inicio']);
    }
    // ESTUDIANTE y otros -> estudiantes-inicio
    else {
      console.log('Redirigiendo a estudiantes-inicio (rol:', numRole, ')');
      this.router.navigate(['/estudiantes-inicio']);
    }
  }
}
