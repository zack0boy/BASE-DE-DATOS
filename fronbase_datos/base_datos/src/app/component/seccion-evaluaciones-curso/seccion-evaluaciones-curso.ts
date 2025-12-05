import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-evaluaciones-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-evaluaciones-curso.html',
  styleUrl: './seccion-evaluaciones-curso.css'
})
export class SeccionEvaluacionesCursoComponent {
  @Input() evaluaciones: any[] = [];

  getEstadoClass(estado: string): string {
    const estadoMap: {[key: string]: string} = {
      'proxima': 'estado-proxima',
      'realizada': 'estado-realizada',
      'calificada': 'estado-calificada',
      'sin-calificar': 'estado-sin-calificar'
    };
    return estadoMap[estado?.toLowerCase()] || 'estado-proxima';
  }
}
