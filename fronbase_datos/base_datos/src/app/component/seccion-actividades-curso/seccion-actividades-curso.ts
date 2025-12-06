import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-actividades-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-actividades-curso.html',
  styleUrls: ['./seccion-actividades-curso.css']
})
export class SeccionActividadesCursoComponent {
  @Input() actividades: any[] = [];

  getEstadoClass(estado: string): string {
    const estadoMap: {[key: string]: string} = {
      'abierta': 'estado-abierta',
      'cerrada': 'estado-cerrada',
      'pendiente': 'estado-pendiente',
      'vencida': 'estado-vencida'
    };
    return estadoMap[estado?.toLowerCase()] || 'estado-pendiente';
  }
}
