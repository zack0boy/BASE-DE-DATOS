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
  styleUrls: ['./estudiantes-inicio.css'],
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

    // Verificar el rol del usuario (41=ESTUDIANTE, 42=DOCENTE, 45=ADMIN, 43=SECRETARIA, 44=DIRECTOR)
    const userRole = Number(currentUser.role || currentUser.id_rol || null);
    const isAdmin = userRole === 45 || userRole === 43 || userRole === 44; // ADMIN, SECRETARIA, DIRECTOR
    const isDocente = userRole === 42; // DOCENTE

    console.log('EstudiantesInicio - Usuario rol:', userRole, 'isAdmin:', isAdmin, 'isDocente:', isDocente);

    // Si es admin, secretaria o director -> redirigir a admin-inicio
    if (isAdmin) {
      this.router.navigate(['/admin-inicio']);
      return;
    }

    // Si es docente -> redirigir a docente-inicio
    if (isDocente) {
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
          if (inscripciones.length > 0) {
            console.log('Primera inscripción (para ver estructura):', inscripciones[0]);
          }

          if (!inscripciones || inscripciones.length === 0) {
            this.asignaturas = [];
            this.isLoading = false;
            return;
          }

          // Obtener IDs únicos de asignaturas desde inscripciones (algunos backends devuelven id_asignatura directamente)
          const asignaturaIds = [...new Set(
            inscripciones
              .filter((i: any) => i.idAsignatura || i.id_asignatura || i.idSeccion)
              .map((i: any) => i.idAsignatura || i.id_asignatura || i.idSeccion)
          )];

          if (asignaturaIds.length > 0 && (inscripciones[0].idAsignatura || inscripciones[0].id_asignatura)) {
            // Si las inscripciones traen idAsignatura/id_asignatura directamente
            console.log('Asignaturas ID (desde inscripciones):', asignaturaIds);
            // Obtener TODAS las asignaturas y filtrar localmente
            this.subscription.add(
              this.asignaturasService.getAll().subscribe({
                next: (todasLasAsignaturas: any[]) => {
                  console.log('Todas las asignaturas disponibles:', todasLasAsignaturas);
                  // Filtrar solo las asignaturas que el estudiante necesita
                  const asignaturasDelEstudiante = todasLasAsignaturas.filter((a: any) =>
                    asignaturaIds.includes(a.idAsignatura || a.id_asignatura)
                  );
                  console.log('Datos de asignaturas (filtradas):', asignaturasDelEstudiante);
                  this.asignaturas = asignaturasDelEstudiante;
                  this.isLoading = false;
                },
                error: (error) => {
                  console.error('Error cargando asignaturas:', error);
                  this.isLoading = false;
                }
              })
            );
          } else if (inscripciones[0].idSeccion) {
            // Si traen idSeccion, obtener todas las secciones y mapear a asignaturas
            console.log('Secciones desde inscripciones:', asignaturaIds);
            this.subscription.add(
              this.seccionesService.getAll().subscribe({
                next: (todasLasSecciones: any[]) => {
                  console.log('Todas las secciones:', todasLasSecciones);
                  // Filtrar secciones que el estudiante está inscrito
                  const seccionesDelEstudiante = todasLasSecciones.filter((s: any) =>
                    asignaturaIds.includes(s.idSeccion || s.id_seccion)
                  );
                  // Obtener IDs de asignaturas únicos
                  const asigIds = [...new Set(
                    seccionesDelEstudiante.map((s: any) => s.idAsignatura || s.id_asignatura)
                  )];
                  console.log('Asignaturas ID (desde secciones):', asigIds);

                  if (asigIds.length > 0) {
                    // Obtener TODAS las asignaturas y filtrar localmente
                    this.subscription.add(
                      this.asignaturasService.getAll().subscribe({
                        next: (todasLasAsignaturas: any[]) => {
                          console.log('Todas las asignaturas disponibles:', todasLasAsignaturas);
                          // Filtrar solo las asignaturas que el estudiante necesita
                          const asignaturasDelEstudiante = todasLasAsignaturas.filter((a: any) =>
                            asigIds.includes(a.idAsignatura || a.id_asignatura)
                          );
                          console.log('Datos de asignaturas (filtradas):', asignaturasDelEstudiante);
                          this.asignaturas = asignaturasDelEstudiante;
                          this.isLoading = false;
                        },
                        error: (error) => {
                          console.error('Error cargando todas las asignaturas:', error);
                          this.isLoading = false;
                        }
                      })
                    );
                  } else {
                    this.asignaturas = [];
                    this.isLoading = false;
                  }
                },
                error: (error) => {
                  console.error('Error cargando secciones:', error);
                  // Fallback: obtener todas las asignaturas
                  this.subscription.add(
                    this.asignaturasService.getAll().subscribe({
                      next: (asignaturasData: any[]) => {
                        console.log('Todas las asignaturas (fallback):', asignaturasData);
                        this.asignaturas = asignaturasData || [];
                        this.isLoading = false;
                      },
                      error: (error2) => {
                        console.error('Error cargando asignaturas:', error2);
                        this.isLoading = false;
                      }
                    })
                  );
                }
              })
            );
          } else {
            // Si no vienen IDs de asignatura ni sección, obtener todas las asignaturas disponibles
            this.subscription.add(
              this.asignaturasService.getAll().subscribe({
                next: (asignaturasData: any[]) => {
                  console.log('Todas las asignaturas:', asignaturasData);
                  this.asignaturas = asignaturasData || [];
                  this.isLoading = false;
                },
                error: (error) => {
                  console.error('Error cargando asignaturas:', error);
                  this.isLoading = false;
                }
              })
            );
          }
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
