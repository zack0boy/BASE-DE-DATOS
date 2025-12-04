import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionesService {
  endpoint = 'evaluaciones';
  constructor(private api: ApiService) {}
  getAll() { return this.api.getAll(this.endpoint); }
  get(id: number) { return this.api.getById(this.endpoint, id); }
  create(data: any) { return this.api.create(this.endpoint, data); }
  update(id: number, data: any) { return this.api.update(this.endpoint, id, data); }
  delete(id: number) { return this.api.delete(this.endpoint, id); }
}
