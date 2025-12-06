import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-carreras.component.html',
  styleUrls: ['./admin-manage-carreras.component.css']
})
export class AdminManageCarrerasComponent {
  @Input() asignaturas: any[] = [];
  @Input() secciones: any[] = [];

  expandedCarreraId: any = null;

  toggleDetails(carrera: any) {
    const id = carrera.id || carrera.idCarrera || carrera.id_carrera;
    this.expandedCarreraId = this.expandedCarreraId === id ? null : id;
  }

  getAsignaturasForCarrera(carrera: any) {
    const id = carrera.id || carrera.idCarrera || carrera.id_carrera;
    if (!this.asignaturas) return [];
    return this.asignaturas.filter(a => {
      return a.carrera_id === id || a.carreraId === id || a.idCarrera === id || a.carrera === id;
    });
  }

  getSeccionesForAsignatura(asignatura: any) {
    const id = asignatura.id || asignatura.idAsignatura || asignatura.id_asignatura;
    if (!this.secciones) return [];
    return this.secciones.filter(s => {
      return s.asignatura_id === id || s.asignaturaId === id || s.idAsignatura === id || s.asignatura === id;
    });
  }
  // Pagination
  page: number = 1;
  pageSize: number = 10;

  pagedCarreras(list: any[]): any[] {
    if (!list || !list.length) return [];
    const all = (list || []).slice();
    const start = (this.page - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  totalPages(list: any[]): number {
    const total = (list || []).length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  setPage(p: number, list: any[]) {
    const tp = this.totalPages(list);
    if (p < 1) p = 1;
    if (p > tp) p = tp;
    this.page = p;
  }
  showCreateModal: boolean = false;

  openCreateModal() {
    this.showCreateModal = true;
    this.newCarrera = { nombre: '', codigo: '', descripcion: '', duracion: 8 };
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
  @Input() carreras: any[] = [];
  @Output() createCarrera = new EventEmitter<any>();
  @Output() editCarrera = new EventEmitter<any>();
  @Output() deleteCarrera = new EventEmitter<any>();

  newCarrera: any = { nombre: '', codigo: '', descripcion: '', duracion: 8 };

  onCreateCarrera() {
    if (!this.newCarrera.nombre || !this.newCarrera.codigo) {
      alert('Por favor completa el nombre y código');
      return;
    }
    this.createCarrera.emit(this.newCarrera);
    alert(`Carrera "${this.newCarrera.nombre}" creada exitosamente`);
    this.closeCreateModal();
  }

  onEditCarrera(carrera: any) {
    if (confirm(`¿Editar carrera "${carrera.nombre}"?`)) {
      this.editCarrera.emit(carrera);
      alert(`Se editará la carrera: ${carrera.nombre}`);
    }
  }

  onDeleteCarrera(carrera: any) {
    if (confirm(`¿Eliminar carrera "${carrera.nombre}"?`)) {
      this.deleteCarrera.emit(carrera);
    }
  }

  // Generar código único para carrera: primeras 3 letras del nombre + número aleatorio
  generateCarreraCode() {
    if (!this.newCarrera.nombre || this.newCarrera.nombre.trim().length === 0) {
      alert('Por favor ingresa el nombre de la carrera primero');
      return;
    }
    const prefix = this.newCarrera.nombre.substring(0, 3).toUpperCase();
    let codigo = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 100) {
      const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999
      codigo = `${prefix}-${randomNum}`;

      // Verificar que no exista un código igual
      isUnique = !(this.carreras || []).some(c => c.codigo === codigo);
      attempts++;
    }

    this.newCarrera.codigo = codigo;
  }
}
