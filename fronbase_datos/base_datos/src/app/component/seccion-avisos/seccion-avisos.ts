import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-avisos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-avisos.html',
  styleUrls: ['./seccion-avisos.css']
})
export class SeccionAvisosComponent {
  @Input() avisos: any[] = [];
}
