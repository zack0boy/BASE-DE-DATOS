import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';

interface CareerGroup {
  id_carrera: number;
  nombre: string;
  cursos: Curso[];
}

@Component({
  selector: 'app-course-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  templateUrl: './course-cards.html',
  styleUrls: ['./course-cards.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCards implements OnInit, OnChanges {
  @Input() isAdmin: boolean = false;
  @Input() userCareer?: string;
  @Input() userClass?: string;
  @Input() preloadedAsignaturas?: any[] = [];
  @Input() isLoadingAsignaturas: boolean = false;

  @Output() asignaturaSelected = new EventEmitter<any>();

  careerGroups: CareerGroup[] = [];
  filteredCareerGroups: CareerGroup[] = [];
  loading: boolean = true;
  error: string | null = null;
  isLoading: boolean = false;

  // Filter properties
  searchTerm: string = '';
  estadoFilter: string = 'todos';
  ordenarPor: string = 'nombre';
  seccionFilter: string = 'todas';
  estadoCursoFilter: string = 'todos';
  viewMode: 'tarjeta' | 'lista' = 'tarjeta';

  // Filter options
  estados = [
    { value: 'todos', label: 'Todos' },
    { value: 'activos', label: 'Activos' },
    { value: 'finalizados', label: 'Finalizados' }
  ];

  constructor(
    protected router: Router,
    private cursoService: CursoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Si tenemos asignaturas precargadas, usarlas directamente
    if (this.preloadedAsignaturas && this.preloadedAsignaturas.length > 0) {
      console.log('CourseCards - Usando asignaturas precargadas:', this.preloadedAsignaturas);
      this.loading = false;
      this.processCourses(this.preloadedAsignaturas);
      this.cdr.markForCheck();
    } else {
      this.loadAndFilterCourses();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en preloadedAsignaturas (incluyendo el primer cambio)
    if (changes['preloadedAsignaturas']) {
      if (this.preloadedAsignaturas && this.preloadedAsignaturas.length > 0) {
        console.log('CourseCards - preloadedAsignaturas cambió:', this.preloadedAsignaturas);
        this.loading = false;
        this.processCourses(this.preloadedAsignaturas);
        this.cdr.markForCheck();
      }
    }
  }

  protected loadAndFilterCourses(): void {
    this.loading = true;
    this.isLoading = true;
    this.error = null;

    this.careerGroups = [];
    this.filteredCareerGroups = [];
    this.cdr.detectChanges();

    this.cursoService.getCursos().pipe(
      finalize(() => {
        this.loading = false;
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    ).subscribe({
      next: (allCourses) => {
        try {
          let coursesToDisplay = allCourses;

          if (!this.isAdmin && this.userCareer) {
            const userCareerId = parseInt(this.userCareer, 10);
            if (!isNaN(userCareerId)) {
              coursesToDisplay = allCourses.filter(c => c.id_carrera === userCareerId);
            }
          }

          // Debug: show what courses we're about to process and why
          console.log('CourseCards.loadAndFilterCourses - userCareer:', this.userCareer, 'isAdmin:', this.isAdmin, 'coursesToDisplay.length:', Array.isArray(coursesToDisplay) ? coursesToDisplay.length : 0);
          console.log('CourseCards.loadAndFilterCourses - coursesToDisplay sample:', (Array.isArray(coursesToDisplay) ? coursesToDisplay.slice(0,6) : coursesToDisplay));

          this.processCourses(coursesToDisplay);
        } catch (error) {
          console.error('Error processing courses:', error);
          this.error = 'Error al procesar los cursos. Por favor, intente de nuevo.';
        }
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.error = 'No se pudieron cargar los cursos. Verifique su conexión e intente de nuevo.';
      }
    });
  }

  private processCourses(courses: any[]): void {
    console.log('processCourses - Datos de entrada:', courses);

    if (!courses || courses.length === 0) {
      this.careerGroups = [];
      this.filteredCareerGroups = [];
      this.cdr.markForCheck();
      return;
    }

    const careerMap = new Map<number, CareerGroup>();

    for (const course of courses) {
      // Extraer id_carrera del objeto (puede estar en diferentes propiedades)
      const carreraId = course.id_carrera || course.idCarrera || 0;
      const carreraNombre = course.carrera_nombre || course.nombre || `Asignatura ${course.idAsignatura || course.id_asignatura || course.id}`;

      if (!careerMap.has(carreraId)) {
        careerMap.set(carreraId, {
          id_carrera: carreraId,
          nombre: carreraNombre,
          cursos: []
        });
      }

      // Asegurar que el objeto tiene las propiedades necesarias para la tarjeta
      const courseData: any = {
        id: course.id || course.idAsignatura || course.id_asignatura || String(Math.random()),
        id_carrera: carreraId,
        id_asignatura: course.idAsignatura || course.id_asignatura || course.id,
        carrera_nombre: carreraNombre,
        nombre: course.nombre || 'Sin nombre',
        codigo: course.codigo || 'N/A',
        descripcion: course.descripcion || '',
        seccion: course.seccion || course.seccionNumero || 'N/A',
        progreso: course.progreso || 0,
        creditos: course.creditos || 0,
        aula: course.aula || 'Sin asignar',
        // Propiedades adicionales del modelo Curso
        title: course.nombre || 'Sin nombre',
        location: course.aula || 'Sin asignar',
        period: course.periodo || 'N/A',
        section: course.seccion || 'N/A',
        description: course.descripcion || '',
        teachers: course.teachers || [],
        programUrl: course.programUrl || '',
        planningUrl: course.planningUrl || ''
      };

      careerMap.get(carreraId)?.cursos.push(courseData);
    }

    this.careerGroups = Array.from(careerMap.values())
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    this.careerGroups.forEach(group => {
      group.cursos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    this.filteredCareerGroups = [...this.careerGroups];
    console.log('processCourses - careerGroups procesados:', this.careerGroups);
    this.cdr.markForCheck();
  }

  trackByCourseId(index: number, course: Curso): string {
    return course.id;
  }

  trackByCareerId(index: number, career: CareerGroup): number {
    return career.id_carrera;
  }

  filterCourses(): void {
    if (!this.searchTerm && this.estadoFilter === 'todos' && this.seccionFilter === 'todas') {
      this.filteredCareerGroups = [...this.careerGroups];
      return;
    }

    const searchTermLower = this.searchTerm?.toLowerCase() || '';

    this.filteredCareerGroups = this.careerGroups
      .map(group => {
        const filteredCursos = group.cursos.filter(course => {
          const matchesSearch = !this.searchTerm ||
            (course.nombre?.toLowerCase().includes(searchTermLower) ||
              course.codigo?.toLowerCase().includes(searchTermLower) ||
              course.descripcion?.toLowerCase().includes(searchTermLower));

          const matchesEstado = this.estadoFilter === 'todos' ||
            (this.estadoFilter === 'activos' && course.progreso < 100) ||
            (this.estadoFilter === 'finalizados' && course.progreso >= 100);

          const matchesSeccion = this.seccionFilter === 'todas' ||
            course.seccion === this.seccionFilter;

          return matchesSearch && matchesEstado && matchesSeccion;
        });

        return { ...group, cursos: filteredCursos };
      })
      .filter(group => group.cursos.length > 0);
  }


  getEstadoCurso(progreso: number): string {
    if (progreso >= 100) return 'Completado';
    if (progreso > 0) return 'En progreso';
    return 'Pendiente';
  }

  getEstadoBadgeClass(progreso: number): string {
    if (progreso >= 100) return 'bg-success';
    if (progreso > 0) return 'bg-primary';
    return 'bg-warning text-dark';
  }

  // Return a pleasant header color for a course based on its id
  getCourseColor(course: Curso): string {
    const palette = [
      'linear-gradient(90deg,#8e44ad,#9b5de5)',
      'linear-gradient(90deg,#1572a1,#1982c4)',
      'linear-gradient(90deg,#1b998b,#06d6a0)',
      'linear-gradient(90deg,#f72585,#ff6b6b)',
      'linear-gradient(90deg,#2b8aef,#4cc9f0)',
      'linear-gradient(90deg,#1f7a1f,#2b9348)'
    ];
    const id = Number(course.id_asignatura || 0);
    const idx = isNaN(id) ? Math.abs(this.hashString(course.id || '0')) % palette.length : Math.abs(id) % palette.length;
    return palette[idx];
  }

  private hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return h;
  }

  selectCourseAndNavigate(course: any): void {
    try {
      const grad = this.getCourseColor(course as Curso) || '';
      // Guardar el gradiente completo para que la vista de la asignatura lo reproduzca exactamente
      localStorage.setItem('selectedCourseColor', grad);
    } catch (e) {
      // no-op if localStorage is not available
    }
    this.router.navigate(['/estudiantes-contenido', course.id]);
  }

  selectCourse(course: any): void {
    // Emit event for parent component (e.g., admin page) to handle selection
    this.asignaturaSelected.emit(course);
  }

}
