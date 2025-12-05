import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
export class CourseCards implements OnInit {
  @Input() isAdmin: boolean = false;
  @Input() userCareer?: string;
  @Input() userClass?: string;
  @Input() preloadedAsignaturas?: any[] = [];
  @Input() isLoadingAsignaturas: boolean = false;

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
      this.loading = false;
      this.processCourses(this.preloadedAsignaturas);
    } else {
      this.loadAndFilterCourses();
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

  private processCourses(courses: Curso[]): void {
    const careerMap = new Map<number, CareerGroup>();

    for (const course of courses) {
      if (!careerMap.has(course.id_carrera)) {
        careerMap.set(course.id_carrera, {
          id_carrera: course.id_carrera,
          nombre: course.carrera_nombre || `Carrera ${course.id_carrera}`,
          cursos: []
        });
      }
      careerMap.get(course.id_carrera)?.cursos.push(course);
    }

    this.careerGroups = Array.from(careerMap.values())
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    this.careerGroups.forEach(group => {
      group.cursos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    this.filteredCareerGroups = [...this.careerGroups];
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

}
