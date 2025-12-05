import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FieldMapperService } from './field-mapper.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsignacionesDocenteService {
  endpoint = 'asignaciones-docente';
  constructor(private api: ApiService, private mapper: FieldMapperService) {}

  getAll() {
    return this.api.getAll(this.endpoint).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  get(id: number) {
    return this.api.getById(this.endpoint, id).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  getByAsignatura(asignaturaId: number) {
    return this.api.getAll(`${this.endpoint}?asignatura=${asignaturaId}`).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  getByDocente(docenteId: number) {
    return this.api.getAll(`${this.endpoint}?usuario=${docenteId}`).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  create(data: any) {
    return this.api.create(this.endpoint, data).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  update(id: number, data: any) {
    return this.api.update(this.endpoint, id, data).pipe(
      map(data => this.mapper.snakeToCamel(data))
    );
  }

  delete(id: number) {
    return this.api.delete(this.endpoint, id);
  }
}
