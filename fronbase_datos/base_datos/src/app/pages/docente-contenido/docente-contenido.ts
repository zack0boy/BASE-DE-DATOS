import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, finalize, switchMap, filter, map, tap } from 'rxjs/operators';

import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { HeaderAsignaturaComponent } from '../../component/header-asignatura/header-asignatura';
import { TabsNavegacionComponent, Tab } from '../../component/tabs-navegacion/tabs-navegacion';
import { SeccionPresentacionComponent } from '../../component/seccion-presentacion/seccion-presentacion';
import { SeccionAvisosComponent } from '../../component/seccion-avisos/seccion-avisos';
import { SeccionContenidosCursoComponent } from '../../component/seccion-contenidos-curso/seccion-contenidos-curso';
import { SeccionActividadesCursoComponent } from '../../component/seccion-actividades-curso/seccion-actividades-curso';
import { SeccionEvaluacionesCursoComponent } from '../../component/seccion-evaluaciones-curso/seccion-evaluaciones-curso';
import { SeccionEntregasCursoComponent } from '../../component/seccion-entregas-curso/seccion-entregas-curso';
import { SeccionDocentesCursoComponent } from '../../component/seccion-docentes-curso/seccion-docentes-curso';
import { SeccionNotasCursoComponent } from '../../component/seccion-notas-curso/seccion-notas-curso';

import { CursoService } from '../../services/curso.service';
import { MaterialCursoService } from '../../services/material-curso.service';
import { ActividadesService } from '../../services/actividades.service';
import { AsignacionesDocenteService } from '../../services/asignaciones-docente.service';
import { AnunciosService } from '../../services/anuncios.service';
import { ContenidosService } from '../../services/contenidos.service';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';

import {
  CursoDetalle,
  MaterialCurso,
  Docente,
  ProgramaCurso,
  ActividadCurso,
  AnuncioCurso
} from '../../models/curso.model';

import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';

@Component({
  selector: 'app-docente-contenido',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Header,
    Footer,
    HeaderAsignaturaComponent,
    TabsNavegacionComponent,
    SeccionPresentacionComponent,
    SeccionAvisosComponent,
    SeccionContenidosCursoComponent,
    SeccionActividadesCursoComponent,
    SeccionEvaluacionesCursoComponent,
    SeccionEntregasCursoComponent,
    SeccionDocentesCursoComponent,
    SeccionNotasCursoComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './docente-contenido.html',
  styleUrl: './docente-contenido.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocenteContenidoComponent implements OnInit, OnDestroy {

  courseId: string | null = null;
  courseData: CursoDetalle | null = null;
  materiales: MaterialCurso[] = [];
  docentes: Docente[] = [];
  programa: ProgramaCurso | null | undefined = undefined;
  actividades: ActividadCurso[] = [];
  anuncios: AnuncioCurso[] = [];
  contenidos: any[] = [];
  evaluaciones: any[] = [];
  entregas: any[] = [];

  currentUserId: string | null = null;
  isEditMode = false;

  activeTab: string = 'presentacion';
  tabs: Tab[] = [
    { id: 'presentacion', label: 'Presentación' },
    { id: 'contenidos', label: 'Contenidos' },
    { id: 'actividades', label: 'Actividades' },
    { id: 'evaluaciones', label: 'Evaluaciones' },
    { id: 'entregas', label: 'Entregas' },
    { id: 'avisos', label: 'Avisos' },
    { id: 'notas', label: 'Notas' }
  ];

  loading = true;
  error: string | null = null;
  private subscriptions = new Subscription();

  get docentesNombres(): string[] {
    return this.docentes
      .map(d => (d as any).nombres || (d as any).nombre)
      .filter(name => !!name);
  }

  get programaContenidos(): any[] {
    if (!this.programa) return [];
    return (this.programa as any).contenidos || [];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
    private materialCursoService: MaterialCursoService,
    private actividadesService: ActividadesService,
    private asignacionesDocenteService: AsignacionesDocenteService,
    private anunciosService: AnunciosService,
    private contenidosService: ContenidosService,
    private evaluacionesService: EvaluacionesService,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Obtener ID del usuario actual (docente)
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.id || null;

    if (!this.currentUserId) {
      this.handleError('No se pudo identificar al usuario docente');
      return;
    }

    this.subscriptions.add(
      this.route.paramMap.pipe(
        map(params => params.get('id')),
        filter(id => !!id),
        tap(id => this.courseId = id),
        switchMap(() => {
          this.reloadData();
          return of(null);
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  reloadData(): void {
    this.loading = true;
    this.error = null;
    this.cd.detectChanges();

    if ('clearCacheForCourse' in this.cursoService) {
      (this.cursoService as any).clearCacheForCourse(this.courseId);
    }

    this.loadCourseData();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    this.cd.detectChanges();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.cd.detectChanges();
  }

  private loadCourseData(): void {
    if (!this.courseId) {
      this.handleError('ID de curso no encontrado.');
      return;
    }

    const data$ = forkJoin({
      curso: this.cursoService.getCursoPorId(this.courseId),
      materiales: this.materialCursoService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([]))),
      docentes: this.asignacionesDocenteService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([]))),
      usuarios: this.usuariosService.getAll().pipe(catchError(() => of([]))),
      contenidos: this.contenidosService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([]))),
      actividades: this.actividadesService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([]))),
      evaluaciones: this.evaluacionesService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([]))),
      anuncios: this.anunciosService.getByAsignatura(Number(this.courseId)).pipe(catchError(() => of([])))
    }).pipe(
      map(data => {
        // Filtrar docentes: buscar usuarios con role_id = 42 relacionados a la asignatura
        let filteredDocentes: any[] = [];

        console.log('DEBUG - Cargando docentes:');
        console.log('Asignaciones docentes:', data.docentes);
        console.log('Todos los usuarios:', data.usuarios);

        // Si tenemos usuarios, filtrar por role_id = 42 (docentes)
        if (Array.isArray(data.usuarios) && data.usuarios.length > 0) {
          // Filtrar usuarios con rol docente (role_id = 42 o id_rol = 42)
          const usuariosDocentes = (data.usuarios as any[]).filter(u =>
            u.role_id === 42 || u.id_rol === 42 || u.roleId === 42
          );

          console.log('Docentes filtrados por role:', usuariosDocentes);

          // Si hay asignaciones docentes para esta asignatura
          if (Array.isArray(data.docentes) && data.docentes.length > 0) {
            const docenteIds = (data.docentes as any[])
              .map((d: any) => d.usuario_id || d.id_usuario || d.id)
              .filter((id: any) => !!id);

            console.log('IDs de docentes asignados:', docenteIds);

            filteredDocentes = usuariosDocentes.filter(u =>
              docenteIds.includes(u.id || u.id_usuario || u.usuario_id)
            );
          } else {
            filteredDocentes = usuariosDocentes;
          }
        }

        console.log('Docentes finales:', filteredDocentes);

        return {
          ...data,
          docentes: filteredDocentes
        };
      }),
      finalize(() => {
        this.loading = false;
        this.cd.detectChanges();
      })
    );

    const dataSub = data$.subscribe({
      next: (data) => {
        if (!data.curso) {
          this.handleError('No se pudo cargar la información del curso');
          return;
        }

        console.log('DEBUG - Datos del curso cargados:', data.curso);
        console.log('DEBUG - Title:', data.curso.title);
        console.log('DEBUG - Nombre:', data.curso.nombre);
        console.log('DEBUG - Description:', data.curso.description);
        console.log('DEBUG - Descripción:', data.curso.descripcion);

        this.courseData = data.curso;
        this.materiales = data.materiales as any;
        this.docentes = data.docentes as any;
        this.contenidos = data.contenidos as any;
        this.actividades = data.actividades as any;
        this.evaluaciones = data.evaluaciones as any;
        this.anuncios = data.anuncios as any;
        this.programa = undefined;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los datos del curso:', err);
        this.handleError('Error al cargar la información del curso. Por favor, intente nuevamente.');
      }
    });

    this.subscriptions.add(dataSub);
  }

  private handleError(message: string): void {
    this.error = message;
    this.loading = false;
    this.cd.detectChanges();
  }
}
