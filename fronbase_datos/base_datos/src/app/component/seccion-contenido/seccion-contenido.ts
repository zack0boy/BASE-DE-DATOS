import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-contenido.html',
  styleUrls: ['./seccion-contenido.css']
})
export class SeccionContenidoComponent {
  @Input() titulo: string = '';
  @Input() contenido: any[] = [];
  @Input() tipo: 'presentacion' | 'avisos' | 'unidades' | 'recursos' = 'presentacion';
}
