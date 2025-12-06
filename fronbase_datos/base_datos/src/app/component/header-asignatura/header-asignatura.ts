import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-asignatura',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-asignatura.html',
  styleUrls: ['./header-asignatura.css']
})
export class HeaderAsignaturaComponent {
  @Input() nombre: string = '';
  @Input() codigo: string = '';
  @Input() aula: string = '';
  @Input() creditos: string = '';
  @Input() seccion: string = '';
  @Input() showBackButton: boolean = false;
}
