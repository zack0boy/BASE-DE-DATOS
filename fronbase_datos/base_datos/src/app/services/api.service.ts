import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getOptions() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
      return { headers };
    }
    return {};
  }

  getAll(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}/`, this.getOptions());
  }
  getById(endpoint: string, id: number) {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}/`, this.getOptions());
  }
  create(endpoint: string, data: any) {
    return this.http.post(`${this.baseUrl}/${endpoint}/`, data, this.getOptions());
  }
  update(endpoint: string, id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}/`, data, this.getOptions());
  }
  delete(endpoint: string, id: number) {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}/`, this.getOptions());
  }
}
