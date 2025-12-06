import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderAsignaturaComponent } from '../header-asignatura/header-asignatura';
import { TabsNavegacionComponent } from '../tabs-navegacion/tabs-navegacion';
import { AdminManageUsersComponent } from '../admin-manage-users/admin-manage-users.component';
import { AdminManageAsignaturasComponent } from '../admin-manage-asignaturas/admin-manage-asignaturas.component';
import { AdminManageCarrerasComponent } from '../admin-manage-carreras/admin-manage-carreras.component';
import { AdminManageSeccionesComponent } from '../admin-manage-secciones/admin-manage-secciones.component';

@Component({
  selector: 'app-admin-manage-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAsignaturaComponent, TabsNavegacionComponent, AdminManageUsersComponent, AdminManageAsignaturasComponent, AdminManageCarrerasComponent, AdminManageSeccionesComponent],
  templateUrl: './admin-manage-shell.component.html',
  styleUrls: ['./admin-manage-shell.component.css']
})
export class AdminManageShellComponent {
  // Workaround: reference imported standalone components so the Angular compiler
  // doesn't emit NG8113 false positives about them being unused in the template.
  // These are not used directly in TS, only referenced to satisfy the analyzer.
  private __referencedStandalone = [HeaderAsignaturaComponent, TabsNavegacionComponent, AdminManageUsersComponent, AdminManageAsignaturasComponent, AdminManageCarrerasComponent, AdminManageSeccionesComponent];
  @Input() estudiantes: any[] = [];
  @Input() docentes: any[] = [];
  @Input() secretarias: any[] = [];
  @Input() directores: any[] = [];
  @Input() admins: any[] = [];
  @Input() asignaturas: any[] = [];
  @Input() carreras: any[] = [];
  @Input() secciones: any[] = [];
  @Input() newAsignatura: any = { nombre: '', codigo: '', secciones: [] };
  @Input() selectedAsignatura: any = null;
  @Input() filteredAsignaturas: any[] = [];
  @Input() showAsignaturaDropdown: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() asignaturaChange = new EventEmitter<any>();
  @Output() createUser = new EventEmitter<void>();
  @Output() createAsignatura = new EventEmitter<any>();
  @Output() editAsignatura = new EventEmitter<any>();
  @Output() deleteAsignatura = new EventEmitter<any>();
  @Output() createCarrera = new EventEmitter<any>();
  @Output() editCarrera = new EventEmitter<any>();
  @Output() deleteCarrera = new EventEmitter<any>();
  @Output() createSection = new EventEmitter<any>();
  @Output() editSection = new EventEmitter<any>();
  @Output() deleteSection = new EventEmitter<any>();
  @Output() selectAsignatura = new EventEmitter<any>();
  @Output() clearAsignatura = new EventEmitter<void>();

  tabs = [
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'docentes', label: 'Docentes' },
    { id: 'secretarias', label: 'Secretarias' },
    { id: 'directores', label: 'Directores' },
    { id: 'admins', label: 'Administradores' },
    { id: 'asignaturas', label: 'Asignaturas' },
    { id: 'secciones', label: 'Secciones' },
    { id: 'carreras', label: 'Carreras' }
  ];

  activeTab: string = 'estudiantes';

  filter: any = { q: '', rut: '', asignaturaId: '' };

  onFilterChange(f: any) { this.filter = f || { q: '', rut: '', asignaturaId: '' }; }

  setTab(id: string) { this.activeTab = id; }

  getCount(id: string) {
    switch (id) {
      case 'estudiantes': return (this.estudiantes || []).length;
      case 'docentes': return (this.docentes || []).length;
      case 'secretarias': return (this.secretarias || []).length;
      case 'directores': return (this.directores || []).length;
      case 'admins': return (this.admins || []).length;
      default: return 0;
    }
  }

  onSearchChange(val: string) { /* passthrough handled by header component output bound in template */ }
}
