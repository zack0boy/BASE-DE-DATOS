import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-entregas-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-entregas-curso.html',
  styleUrl: './seccion-entregas-curso.css'
})
export class SeccionEntregasCursoComponent {
  @Input() entregas: any[] = [];

  getEstadoEntrega(estado: string): string {
    const estadoMap: {[key: string]: string} = {
      'entregada': 'estado-entregada',
      'pendiente': 'estado-pendiente',
      'vencida': 'estado-vencida',
      'calificada': 'estado-calificada'
    };
    return estadoMap[estado?.toLowerCase()] || 'estado-pendiente';
  }
}
