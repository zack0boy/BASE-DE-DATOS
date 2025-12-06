import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { CourseCards } from '../../component/course-cards/course-cards';
import { AuthService } from '../../services/auth.service';
import { AsignaturasService } from '../../services/asignaturas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [CommonModule, Header, Footer, CourseCards],
  templateUrl: './admin-inicio.html',
  styleUrls: ['./admin-inicio.css']
})
export class AdminInicio implements OnInit, OnDestroy {
  asignaturas: any[] = [];
  isLoading: boolean = true;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private asignaturasService: AsignaturasService
  ) {}

  navigateToManage(asignatura: any): void {
    const asigId = asignatura.idAsignatura || asignatura.id_asignatura || asignatura.id;
    this.router.navigate(['/admin-manage'], { queryParams: { asignatura: asigId } });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const userRole = Number(user?.role || user?.id_rol || null);
    const isAdmin = userRole === 45 || userRole === 43 || userRole === 44; // ADMIN, SECRETARIA, DIRECTOR

    console.log('AdminInicio - Usuario rol:', userRole, 'isAdmin:', isAdmin);

    if (!isAdmin) {
      // Si no es admin, secretaria o director, redirigir según su rol
      const isDocente = userRole === 42;
      if (isDocente) {
        this.router.navigate(['/docente-inicio']);
      } else {
        this.router.navigate(['/estudiantes-inicio']);
      }
      return;
    }

    this.loadAllAsignaturas();
  }

  loadAllAsignaturas(): void {
    this.isLoading = true;
    this.subscription.add(
      this.asignaturasService.getAll().subscribe({
        next: (data: any[]) => {
          this.asignaturas = data || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error cargando asignaturas para admin:', err);
          this.asignaturas = [];
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
