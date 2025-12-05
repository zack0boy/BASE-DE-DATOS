import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { CourseCards } from '../../component/course-cards/course-cards';
import { AuthService } from '../../services/auth.service';
import { AsignacionesDocenteService } from '../../services/asignaciones-docente.service';
import { SeccionesService } from '../../services/secciones.service';
import { AsignaturasService } from '../../services/asignaturas.service';
import { Subscription, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-docente-inicio',
  standalone: true,
  imports: [CommonModule, Header, Footer, CourseCards],
  templateUrl: './docente-inicio.html',
  styleUrl: './docente-inicio.css',
})
export class DocenteInicio implements OnInit, OnDestroy {
  docenteName: string = '';
  docenteId: string = '';
  departamento: string = 'Departamento';
  isAdmin: boolean = false;
  isDocente: boolean = false;
  asignaturas: any[] = [];
  isLoading: boolean = true;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private asignacionesService: AsignacionesDocenteService,
    private seccionesService: SeccionesService,
    private asignaturasService: AsignaturasService
  ) {}

  ngOnInit() {
    // Obtener usuario actual
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Verificar que sea docente (role_id = 42) o admin (role_id = 1)
    const userRole = currentUser.role || null;
    this.isDocente = userRole === 42;
    this.isAdmin = userRole === 1;

    if (!this.isDocente && !this.isAdmin) {
      // Si no es docente ni admin, redirigir a estudiantes-inicio
      this.router.navigate(['/estudiantes-inicio']);
      return;
    }

    // Asignar datos del docente
    this.docenteName = currentUser.name || 'Docente';
    this.docenteId = currentUser.id || '';

    // Cargar asignaturas asignadas
    this.loadAsignaturas();
  }

  loadAsignaturas() {
    this.isLoading = true;
    // Obtener asignaciones del docente
    this.subscription.add(
      this.asignacionesService.getByDocente(parseInt(this.docenteId)).subscribe({
        next: (data: any) => {
          const asignaciones = data as any[];
          console.log('Asignaciones del docente:', asignaciones);

          if (!asignaciones || asignaciones.length === 0) {
            this.asignaturas = [];
            this.isLoading = false;
            return;
          }

          // Obtener IDs únicos de secciones
          const seccionIds = [...new Set(asignaciones.map((a: any) => a.idSeccion))];
          console.log('Secciones asignadas:', seccionIds);

          // Obtener datos de secciones
          const seccionRequests = seccionIds.map((seccionId: any) =>
            this.seccionesService.get(seccionId).pipe(
              catchError(() => of(null))
            )
          );

          this.subscription.add(
            forkJoin(seccionRequests).subscribe({
              next: (secciones: any[]) => {
                console.log('Datos de secciones:', secciones);

                // Obtener IDs únicos de asignaturas
                const asignaturaIds = [...new Set(
                  secciones
                    .filter(s => s !== null)
                    .map((s: any) => s.idAsignatura)
                )];
                console.log('Asignaturas ID:', asignaturaIds);

                // Obtener datos de asignaturas
                const asignaturaRequests = asignaturaIds.map((asignaturaId: any) =>
                  this.asignaturasService.get(asignaturaId).pipe(
                    catchError(() => of(null))
                  )
                );

                this.subscription.add(
                  forkJoin(asignaturaRequests).subscribe({
                    next: (asignaturasData: any[]) => {
                      console.log('Datos de asignaturas:', asignaturasData);
                      this.asignaturas = asignaturasData.filter(a => a !== null);
                      this.isLoading = false;
                    },
                    error: (error) => {
                      console.error('Error cargando asignaturas:', error);
                      this.isLoading = false;
                    }
                  })
                );
              },
              error: (error) => {
                console.error('Error cargando secciones:', error);
                this.isLoading = false;
              }
            })
          );
        },
        error: (error) => {
          console.error('Error cargando asignaciones:', error);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
