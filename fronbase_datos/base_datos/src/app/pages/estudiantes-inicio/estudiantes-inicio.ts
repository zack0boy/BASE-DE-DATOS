import { Component } from '@angular/core';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';

@Component({
  selector: 'app-estudiantes-inicio',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './estudiantes-inicio.html',
  styleUrl: './estudiantes-inicio.css',
})
export class EstudiantesInicio {
}
