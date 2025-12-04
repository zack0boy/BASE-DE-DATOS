import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carrera {
  id_carrera: number;
  nom_carrera: string;
  departamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private apiUrl = 'http://127.0.0.1:8000/api/usuarios/';

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }

}
