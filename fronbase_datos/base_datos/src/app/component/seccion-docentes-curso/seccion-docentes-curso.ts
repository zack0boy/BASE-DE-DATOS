import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DocenteDetalle {
  id: string;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  departamento?: string;
  horarioAtencion?: string;
  fotoUrl?: string;
  descripcion?: string;
}

@Component({
  selector: 'app-seccion-docentes-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-docentes-curso.html',
  styleUrl: './seccion-docentes-curso.css'
})
export class SeccionDocentesCursoComponent {
  @Input() docentes: DocenteDetalle[] = [];

  getNombreCompleto(docente: DocenteDetalle): string {
    const nombre = docente.nombre || '';
    const apellido = docente.apellido || '';
    return `${nombre} ${apellido}`.trim();
  }
}
