import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-secciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-secciones.component.html',
  styleUrls: ['./admin-manage-secciones.component.css']
})
export class AdminManageSeccionesComponent {
  @Input() asignaturas: any[] = [];
  @Input() secciones: any[] = [];
  @Input() carreras: any[] = [];
  @Output() createSection = new EventEmitter<any>();
  @Output() editSection = new EventEmitter<any>();
  @Output() deleteSection = new EventEmitter<any>();

  selectedAsignaturaId: string = '';

  // Pagination
  page: number = 1;
  pageSize: number = 10;

  pagedSections(list: any[]): any[] {
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

  getFilteredSections(): any[] {
    if (!this.selectedAsignaturaId) return this.secciones || [];
    return (this.secciones || []).filter(s => s.asignatura_id === this.selectedAsignaturaId);
  }

  getAsignaturaName(asignaturaId: any): string {
    const asig = (this.asignaturas || []).find(a => a.id === asignaturaId);
    return asig ? asig.nombre : 'No pertenece';
  }

  getCarreraForSection(section: any): string {
    const asig = (this.asignaturas || []).find(a => a.id === section.asignatura_id);
    if (!asig || !asig.carrera_id) return '—';
    const carrera = (this.carreras || []).find(c => c.id === asig.carrera_id);
    return carrera ? carrera.nombre : '—';
  }

  onCreateSection() {
    this.createSection.emit({ asignatura_id: this.selectedAsignaturaId || null });
  }

  editSectionHandler(section: any) {
    this.editSection.emit(section);
  }

  deleteSectionHandler(section: any) {
    this.deleteSection.emit(section);
  }
}
