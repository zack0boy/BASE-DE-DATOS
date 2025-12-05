import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-unidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-unidades.html',
  styleUrl: './seccion-unidades.css'
})
export class SeccionUnidadesComponent {
  @Input() unidades: any[] = [];
  @Input() contenidos: any[] = [];
}
