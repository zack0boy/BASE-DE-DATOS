import { Component } from '@angular/core';
import { Footer } from "../../component/footer/footer";
import { Header } from "../../component/header/header";
import { CarreraService, Carrera } from '../../services/carrera.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrera-page',
  imports: [Footer, Header,CommonModule],
  templateUrl: './carrera-page.html',
  styleUrl: './carrera-page.css',
})
export class CarreraPage {

  carreras: Carrera[] = [];
  loading = true;
  error = '';

  constructor(private carreraService: CarreraService) {}

  ngOnInit() {
    this.carreraService.getCarreras().subscribe({
      next: (data) => {
        this.carreras = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar carreras';
        this.loading = false;
      }
    });
  }

}



