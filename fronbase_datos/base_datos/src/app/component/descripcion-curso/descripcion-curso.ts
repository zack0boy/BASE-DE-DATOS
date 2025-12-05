import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descripcion-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descripcion-curso.html',
  styleUrls: ['./descripcion-curso.css']
})
export class DescripcionCursoComponent {
  @Input() description: string = '';
}
