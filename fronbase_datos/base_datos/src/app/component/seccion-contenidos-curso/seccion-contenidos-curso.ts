import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-contenidos-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-contenidos-curso.html',
  styleUrls: ['./seccion-contenidos-curso.css']
})
export class SeccionContenidosCursoComponent {
  @Input() contenidos: any[] = [];

  getIconClass(tipo: string): string {
    const iconMap: {[key: string]: string} = {
      'documento': 'icon-document',
      'video': 'icon-video',
      'enlace': 'icon-link',
      'presentacion': 'icon-presentation',
      'otro': 'icon-file'
    };
    return iconMap[tipo] || 'icon-file';
  }
}
