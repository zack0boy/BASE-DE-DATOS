import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-programa-planificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-programa-planificacion.html',
  styleUrls: ['./seccion-programa-planificacion.css']
})
export class SeccionProgramaPlanificacionComponent {
  @Input() programUrl: string = '#';
  @Input() planningUrl: string = '#';
}
