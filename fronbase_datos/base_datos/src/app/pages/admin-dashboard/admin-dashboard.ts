import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { AsignaturasService } from '../../services/asignaturas.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { MensajesInternosService } from '../../services/mensajes-internos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AsignacionesDocenteService } from '../../services/asignaciones-docente.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, Header, Footer, BaseChartDirective],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  totalAsignaturas: number = 0;
  totalInscripciones: number = 0;
  totalMensajes: number = 0;
  totalEstudiantes: number = 0;
  totalDocentes: number = 0;
  totalDocentesRegistrados: number = 0;
  totalDocentesAsignados: number = 0;
  inscripcionesPromedio: number = 0;
  isLoading: boolean = true;

  chartData: ChartConfiguration['data'] = {
    labels: ['Asignaturas', 'Inscripciones', 'Mensajes', 'Estudiantes', 'Docentes'],
    datasets: [
      {
        label: 'Estadísticas Generales',
        data: [],
        backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'],
        borderColor: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'],
        borderWidth: 2
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  constructor(
    private asignaturasService: AsignaturasService,
    private inscripcionesService: InscripcionesService,
    private mensajesService: MensajesInternosService,
    private usuariosService: UsuariosService,
    private asignacionesDocenteService: AsignacionesDocenteService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Register all standard Chart.js components (ensures doughnut controller is available)
    try {
      Chart.register(...registerables);
    } catch (e) {
      console.warn('Chart registration warning:', e);
    }

    forkJoin({
      asignaturas: this.asignaturasService.getAll().pipe(catchError(() => of([]))),
      inscripciones: (this.inscripcionesService.getAll ? this.inscripcionesService.getAll().pipe(catchError(() => of([]))) : of([])),
      mensajes: (this.mensajesService.getAll ? this.mensajesService.getAll().pipe(catchError(() => of([]))) : of([])),
      usuarios: this.usuariosService.getAll().pipe(catchError(() => of([]))),
      asignaciones: this.asignacionesDocenteService.getAll().pipe(catchError(() => of([])))
    }).subscribe(({ asignaturas, inscripciones, mensajes, usuarios, asignaciones }: any) => {
      this.totalAsignaturas = Array.isArray(asignaturas) ? asignaturas.length : 0;
      this.totalInscripciones = Array.isArray(inscripciones) ? inscripciones.length : 0;
      this.totalMensajes = Array.isArray(mensajes) ? mensajes.length : 0;

      // Normalizar y contar roles usando distintas formas de respuesta del backend
      const getRoleId = (u: any): number | null => {
        if (!u) return null;
        const r = u.role ?? u.id_rol ?? u.rol?.id_rol ?? null;
        if (r) return Number(r);
        const rn = (u.rol?.nombre_rol || u.nombre_rol || u.role_name || '').toString().toUpperCase();
        const map: Record<string, number> = { 'ESTUDIANTE': 41, 'STUDENT': 41, 'DOCENTE': 42, 'TEACHER': 42, 'SECRETARIA': 43, 'SECRETARY': 43, 'DIRECTOR': 44, 'ADMIN': 45 };
        return map[rn] || null;
      };

      if (Array.isArray(usuarios)) {
        this.totalDocentesRegistrados = usuarios.filter((u: any) => getRoleId(u) === 42).length;
        this.totalEstudiantes = usuarios.filter((u: any) => getRoleId(u) === 41).length;
        // por defecto mostrar los registrados
        this.totalDocentes = this.totalDocentesRegistrados;
      }

      // Contar docentes asignados a asignaturas (si la API de asignaciones entrega usuario/id)
      if (Array.isArray(asignaciones)) {
        const docentesSet = new Set<number>();
        for (const a of asignaciones) {
          const uid = Number(a.usuario || a.id_usuario || a.user || a.usuario_id || a.user_id || a.docenteId || a.id_docente || a.idUsuario || null);
          if (!isNaN(uid) && uid) docentesSet.add(uid);
        }
        this.totalDocentesAsignados = docentesSet.size;
        // Si hay asignaciones, preferimos mostrar cuantos docentes están asignados como el total principal
        if (this.totalDocentesAsignados > 0) {
          this.totalDocentes = this.totalDocentesAsignados;
        }
      }

      // Calcular promedio de inscripciones por asignatura (decimal con 1 cifra)
      this.inscripcionesPromedio = this.totalAsignaturas > 0 ? Number((this.totalInscripciones / this.totalAsignaturas).toFixed(1)) : 0;

      // Actualizar datos del gráfico
      if (this.chartData.datasets && this.chartData.datasets[0]) {
        this.chartData.datasets[0].data = [
          this.totalAsignaturas,
          this.totalInscripciones,
          this.totalMensajes,
          this.totalEstudiantes,
          this.totalDocentes
        ];
      }

      this.isLoading = false;
      this.cd.markForCheck();
    }, (err) => {
      console.error('Error cargando estadísticas admin:', err);
      this.isLoading = false;
      this.cd.markForCheck();
    });
  }
}
