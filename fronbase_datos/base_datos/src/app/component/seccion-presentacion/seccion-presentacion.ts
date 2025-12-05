import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-presentacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-presentacion.html',
  styleUrl: './seccion-presentacion.css'
})
export class SeccionPresentacionComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagenBg: string = '';
}
