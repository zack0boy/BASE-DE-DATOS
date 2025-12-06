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
  styleUrls: ['./docente-inicio.css'],
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

    // Verificar el rol del usuario (41=ESTUDIANTE, 42=DOCENTE, 45=ADMIN, 43=SECRETARIA, 44=DIRECTOR)
    const userRole = Number(currentUser.role || currentUser.id_rol || null);
    this.isDocente = userRole === 42; // DOCENTE
    this.isAdmin = userRole === 45 || userRole === 43 || userRole === 44; // ADMIN, SECRETARIA, DIRECTOR

    console.log('DocenteInicio - Usuario rol:', userRole, 'isDocente:', this.isDocente, 'isAdmin:', this.isAdmin);

    // Si es estudiante (sin rol válido), redirigir a estudiantes-inicio
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

    // Si es admin, mostrar TODAS las asignaturas
    if (this.isAdmin) {
      this.subscription.add(
        this.asignaturasService.getAll().subscribe({
          next: (asignaturasData: any[]) => {
            console.log('Todas las asignaturas (admin):', asignaturasData);
            this.asignaturas = asignaturasData || [];
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error cargando asignaturas:', error);
            this.asignaturas = [];
            this.isLoading = false;
          }
        })
      );
      return;
    }

    // Si es docente, obtener solo sus asignaturas asignadas
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

          // Obtener IDs únicos de asignaturas desde asignaciones (si las traen directamente)
          const asignaturaIds = [...new Set(
            asignaciones
              .filter((a: any) => a.idAsignatura || a.id_asignatura)
              .map((a: any) => a.idAsignatura || a.id_asignatura)
          )];

          if (asignaturaIds.length > 0) {
            console.log('Asignaturas ID (desde asignaciones):', asignaturaIds);
            // Obtener TODAS las asignaturas y filtrar localmente
            this.subscription.add(
              this.asignaturasService.getAll().subscribe({
                next: (todasLasAsignaturas: any[]) => {
                  console.log('Todas las asignaturas disponibles:', todasLasAsignaturas);
                  // Filtrar solo las asignaturas asignadas al docente
                  const asignaturasDelDocente = todasLasAsignaturas.filter((a: any) =>
                    asignaturaIds.includes(a.idAsignatura || a.id_asignatura)
                  );
                  console.log('Datos de asignaturas (filtradas):', asignaturasDelDocente);
                  this.asignaturas = asignaturasDelDocente;
                  this.isLoading = false;
                },
                error: (error) => {
                  console.error('Error cargando asignaturas:', error);
                  this.isLoading = false;
                }
              })
            );
          } else {
            // Fallback: obtener todas las asignaturas si no vienen IDs
            this.subscription.add(
              this.asignaturasService.getAll().subscribe({
                next: (asignaturasData: any[]) => {
                  console.log('Todas las asignaturas (fallback):', asignaturasData);
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
