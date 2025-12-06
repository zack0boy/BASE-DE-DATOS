import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-asignaturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-asignaturas.component.html',
  styleUrls: ['./admin-manage-asignaturas.component.css']
})
export class AdminManageAsignaturasComponent {
  @Input() asignaturas: any[] = [];
  @Input() secciones: any[] = [];
  @Input() newAsignatura: any = { nombre: '', codigo: '', secciones: [], horas: 4 };
  @Output() createAsignatura = new EventEmitter<any>();
  @Output() editAsignatura = new EventEmitter<any>();
  @Output() deleteAsignatura = new EventEmitter<any>();
  @Output() editSection = new EventEmitter<any>();
  @Output() deleteSection = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();
  // Pagination
  page: number = 1;
  pageSize: number = 10;

  pagedAsignaturas(list: any[]): any[] {
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
  sectionName: string = '';
  selectedAsignaturaId: string = '';
  searchTerm: string = '';

  openCreateModal() {
    this.showCreateModal = true;
    this.newAsignatura = { nombre: '', codigo: '', secciones: [], horas: 4 };
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.sectionName = '';
  }

  getFilteredAsignaturas(): any[] {
    if (!this.searchTerm) return this.asignaturas || [];
    const term = this.searchTerm.toLowerCase();
    return (this.asignaturas || []).filter(a =>
      a.nombre.toLowerCase().includes(term) ||
      a.codigo.toLowerCase().includes(term)
    );
  }

  createAsig() {
    if (!this.newAsignatura.nombre || !this.newAsignatura.codigo) {
      alert('Por favor completa el nombre y codigo');
      return;
    }
    if (!this.newAsignatura.secciones || this.newAsignatura.secciones.length === 0) {
      this.newAsignatura.secciones = [{ nombre: 'Seccion A' }];
    }
    this.createAsignatura.emit(this.newAsignatura);
    alert(`Asignatura "${this.newAsignatura.nombre}" creada exitosamente`);
    this.closeCreateModal();
  }

  onEditAsignatura(asig: any) {
    if (confirm(`Editar "${asig.nombre}"?`)) {
      this.editAsignatura.emit(asig);
      alert(`Se editara la asignatura: ${asig.nombre}`);
    }
  }

  onDeleteAsignatura(asig: any) {
    if (confirm(`Eliminar "${asig.nombre}"?`)) {
      this.deleteAsignatura.emit(asig);
    }
  }

  generateAsignaturaCode() {
    if (!this.newAsignatura.nombre || this.newAsignatura.nombre.trim().length === 0) {
      alert('Por favor ingresa el nombre de la asignatura primero');
      return;
    }
    const prefix = this.newAsignatura.nombre.substring(0, 3).toUpperCase();
    let codigo = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 100) {
      const randomNum = Math.floor(Math.random() * 900) + 100;
      codigo = prefix + '-' + randomNum;
      isUnique = !(this.asignaturas || []).some(a => a.codigo === codigo);
      attempts++;
    }

    this.newAsignatura.codigo = codigo;
  }

  getFilteredSections(): any[] {
    if (!this.selectedAsignaturaId) {
      return this.secciones || [];
    }
    return (this.secciones || []).filter(s => s.asignatura_id === this.selectedAsignaturaId);
  }

  getAsignaturaName(asignaturaId: any): string {
    const asig = (this.asignaturas || []).find(a => a.id === asignaturaId);
    return asig ? asig.nombre : 'No pertenece';
  }

  editSectionHandler(section: any) {
    if (confirm(`Editar seccion "${section.nombre}"?`)) {
      this.editSection.emit(section);
    }
  }

  deleteSectionHandler(section: any) {
    if (confirm(`Eliminar seccion "${section.nombre}"?`)) {
      this.deleteSection.emit(section);
    }
  }
}

