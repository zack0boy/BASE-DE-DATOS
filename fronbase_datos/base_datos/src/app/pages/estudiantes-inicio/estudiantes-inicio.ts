import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { CourseCards } from '../../component/course-cards/course-cards';
import { AuthService } from '../../services/auth.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { SeccionesService } from '../../services/secciones.service';
import { AsignaturasService } from '../../services/asignaturas.service';
import { Subscription, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-estudiantes-inicio',
  standalone: true,
  imports: [CommonModule, Header, Footer, CourseCards],
  templateUrl: './estudiantes-inicio.html',
  styleUrl: './estudiantes-inicio.css',
})
export class EstudiantesInicio implements OnInit, OnDestroy {
  userCareer: string = 'INGENIERÍA CIVIL INFORMÁTICA (SAN MIGUEL)';
  userClass: string = '2025/002';
  isAdmin: boolean = false;
  alumnoId: string = '';
  alumnoName: string = '';
  asignaturas: any[] = [];
  isLoading: boolean = true;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private inscripcionesService: InscripcionesService,
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

    // Verificar el rol del usuario
    const userRole = currentUser.role || null;
    const isDocente = userRole === 42;
    const isAdmin = userRole === 1;

    // Si es docente o admin, redirigir a docente-inicio
    if (isDocente || isAdmin) {
      this.router.navigate(['/docente-inicio']);
      return;
    }

    // Si es estudiante, permitir el acceso
    this.isAdmin = isAdmin;
    this.alumnoId = currentUser.id || '';
    this.alumnoName = currentUser.name || '';

    // Cargar asignaturas del alumno
    this.loadAsignaturas();
  }

  loadAsignaturas() {
    this.isLoading = true;
    // Obtener inscripciones del alumno
    this.subscription.add(
      this.inscripcionesService.getByEstudiante(parseInt(this.alumnoId)).subscribe({
        next: (data: any) => {
          const inscripciones = data as any[];
          console.log('Inscripciones del alumno:', inscripciones);

          if (!inscripciones || inscripciones.length === 0) {
            this.asignaturas = [];
            this.isLoading = false;
            return;
          }

          // Obtener IDs únicos de secciones
          const seccionIds = [...new Set(inscripciones.map((i: any) => i.idSeccion))];
          console.log('Secciones inscritas:', seccionIds);

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
          console.error('Error cargando inscripciones:', error);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
