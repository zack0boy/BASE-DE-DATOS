import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-admin-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDeleteModalComponent, CreateUserModalComponent],
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
  export class AdminManageUsersComponent {
  @Input() role: string = 'estudiantes';
  @Input() estudiantes: any[] = [];
  @Input() docentes: any[] = [];
  @Input() secretarias: any[] = [];
  @Input() directores: any[] = [];
  @Input() admins: any[] = [];
  @Input() asignaturas: any[] = [];
  @Input() filter: any = null;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() asignaturaChange = new EventEmitter<{user:any, asignatura:any}>();
  @Output() create = new EventEmitter<void>();

  tabList = [
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'docentes', label: 'Docentes' },
    { id: 'secretarias', label: 'Secretarias' },
    { id: 'directores', label: 'Directores' },
    { id: 'admins', label: 'Administradores' }
  ];
  activeTab: string = 'estudiantes';
  // Pagination
  page: number = 1;
  pageSize: number = 10;
  // map to hold per-user asignatura input values
  userAsignMap: Record<string, string> = {};
  // Modal states
  deleteModalOpen: boolean = false;
  createModalOpen: boolean = false;
  userToDelete: any = null;
  // Filter states
  searchFilter: string = '';
  asignaturaFilter: string = '';
  expandedUserSections: string | null = null;

  get usersMap(): Record<string, any[]> {
    return {
      estudiantes: this.estudiantes || [],
      docentes: this.docentes || [],
      secretarias: this.secretarias || [],
      directores: this.directores || [],
      admins: this.admins || []
    };
  }

  get counts(): Record<string, number> {
    const m = this.usersMap;
    return {
      estudiantes: (m['estudiantes'] || []).length,
      docentes: (m['docentes'] || []).length,
      secretarias: (m['secretarias'] || []).length,
      directores: (m['directores'] || []).length,
      admins: (m['admins'] || []).length
    };
  }

  get asignaturaNames(): string[] {
    return (this.asignaturas || []).map(a => a.nombre || a.titulo || '').filter(n => n.length > 0);
  }

  getListForRole(role: string): any[] {
    const m = this.usersMap;
    return m[role] || [];
  }

  setTab(id: string) { this.activeTab = id; }
  roleName(u: any) { return (u && (u.role || u.id_rol)) ? String(u.role || u.id_rol) : 'N/A'; }
  onAsignChange(user: any, val: any) { this.asignaturaChange.emit({ user, asignatura: val }); }

  // Return filtered users for given active tab
  displayedUsers(list: any[]): any[] {
    if (!list || !list.length) return [];
    const f = this.filter || {};
    const q = (f.q || '').toString().trim().toLowerCase();
    const rut = (f.rut || '').toString().trim().toLowerCase();
    const aid = f.asignaturaId || '';
    if (!q && !rut && !aid) return list;
    return list.filter(u => {
      // check asignatura if provided
      if (aid) {
        const ua = u.asignatura_id || u.asignatura || u.id_asignatura || u.idAsignatura || null;
        if (!ua || String(ua) !== String(aid)) return false;
      }
      if (rut) {
        const ur = (u.rut || u.cedula || '').toString().toLowerCase();
        if (!ur.includes(rut)) return false;
      }
      if (q) {
        const name = ((u.nombre || u.name || '') + ' ' + (u.apellido || u.lastName || '')).toLowerCase();
        const email = (u.email || '').toLowerCase();
        return name.includes(q) || email.includes(q);
      }
      return true;
    });
  }

  // Sort users by apellido then nombre
  sortUsers(list: any[]): any[] {
    return (list || []).slice().sort((a, b) => {
      const an = ((a.apellido || a.lastName || '') + ' ' + (a.nombre || a.name || '')).toLowerCase();
      const bn = ((b.apellido || b.lastName || '') + ' ' + (b.nombre || b.name || '')).toLowerCase();
      return an.localeCompare(bn);
    });
  }

  // Return paged users after filtering
  pagedUsers(list: any[]): any[] {
    const all = this.sortUsers(this.displayedUsers(list));
    const start = (this.page - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  totalPages(list: any[]): number {
    const total = this.displayedUsers(list).length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  setPage(p: number, list: any[]) {
    const tp = this.totalPages(list);
    if (p < 1) p = 1;
    if (p > tp) p = tp;
    this.page = p;
  }

  getUserKey(u: any): string {
    return String(u.id || u._id || u.email || u.rut || JSON.stringify(u)).slice(0, 64);
  }

  onAsignInputChange(user: any, val: string) {
    if (!val) {
      this.asignaturaChange.emit({ user, asignatura: null });
      return;
    }
    const found = (this.asignaturas || []).find(a => (a.nombre || a.titulo || '').toLowerCase() === (val || '').toString().toLowerCase());
    this.asignaturaChange.emit({ user, asignatura: found || { id: val, nombre: val } });
  }

  openDeleteModal(user: any) {
    this.userToDelete = user;
    this.deleteModalOpen = true;
  }

  onConfirmDelete() {
    if (this.userToDelete) {
      this.delete.emit(this.userToDelete);
      this.deleteModalOpen = false;
      this.userToDelete = null;
    }
  }

  openCreateModal() {
    this.createModalOpen = true;
  }

  onCreateUser(formData: any) {
    // If email not provided, generate default based on nombre + apellido
    if ((!formData.email || !formData.email.trim()) && formData.nombre && formData.apellido) {
      formData.email = this.generateUniqueEmail(formData.nombre, formData.apellido);
    }
    this.create.emit(formData);
    this.createModalOpen = false;
  }

  generateUniqueEmail(nombre: string, apellido: string): string {
    const normalize = (s: string) => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');

    const first = normalize(nombre || '');
    const last = normalize(apellido || '');
    let base = (first + '.' + last).replace(/\.{2,}/g, '.').replace(/^\.|\.$/g, '');
    if (!base) base = 'usuario';
    const domain = '@ucm.cl';

    // Collect existing emails across all roles
    const existing = new Set<string>();
    const pushEmails = (arr: any[] = []) => arr.forEach(u => { if (u && u.email) existing.add((u.email || '').toLowerCase()); });
    pushEmails(this.estudiantes);
    pushEmails(this.docentes);
    pushEmails(this.secretarias);
    pushEmails(this.directores);
    pushEmails(this.admins);

    const candidate = `${base}${domain}`;
    if (!existing.has(candidate)) return candidate;

    // try .01, .02 ...
    for (let i = 1; i < 100; i++) {
      const suffix = '.' + ('0' + i).slice(-2);
      const c = `${base}${suffix}${domain}`;
      if (!existing.has(c)) return c;
    }
    // fallback
    return `${base}.${Date.now()}${domain}`;
  }

  getAllEmails(): string[] {
    const list: string[] = [];
    const push = (arr: any[]) => arr && arr.forEach(u => { if (u && u.email) list.push((u.email || '').toLowerCase()); });
    push(this.estudiantes);
    push(this.docentes);
    push(this.secretarias);
    push(this.directores);
    push(this.admins);
    return list;
  }

  // Filtrar usuarios por búsqueda y asignatura
  filteredUsers(list: any[]): any[] {
    if (!list || !list.length) return [];
    return list.filter(u => {
      // Filtro por texto de búsqueda
      if (this.searchFilter && this.searchFilter.trim()) {
        const q = this.searchFilter.toLowerCase();
        const name = ((u.nombre || u.name || '') + ' ' + (u.apellido || u.lastName || '')).toLowerCase();
        const email = (u.email || '').toLowerCase();
        if (!name.includes(q) && !email.includes(q)) return false;
      }
      // Filtro por asignatura
      if (this.asignaturaFilter) {
        const userAsign = this.userAsignMap[this.getUserKey(u)];
        if (!userAsign || userAsign !== this.asignaturaFilter) return false;
      }
      return true;
    });
  }

  // Toggle expandir/colapsar secciones de un usuario
  toggleSections(user: any) {
    if (this.expandedUserSections === user.id) {
      this.expandedUserSections = null;
    } else {
      this.expandedUserSections = user.id;
    }
  }

  // Obtener secciones asociadas a un usuario
  getSectionsForUser(user: any): any[] {
    // Si el usuario tiene asignatura asignada, retornar sus secciones
    const userAsign = this.userAsignMap[this.getUserKey(user)];
    if (userAsign) {
      const asign = (this.asignaturas || []).find(a => (a.nombre || a.titulo) === userAsign);
      if (asign && asign.secciones && asign.secciones.length > 0) {
        return asign.secciones;
      }
    }
    return [];
  }

  // Confirmar todos los cambios realizados
  confirmChanges() {
    const changes = Object.keys(this.userAsignMap).filter(k => this.userAsignMap[k]);
    if (changes.length === 0) {
      alert('No hay cambios pendientes');
      return;
    }
    // Emitir evento de confirmación (puede ser escuchado por el shell)
    alert(`Se confirmarán ${changes.length} cambios de asignatura`);
    // Aquí se pueden guardar los cambios en backend
  }

  // Retorna la asignatura a mostrar para un usuario (nombre legible)
  getAsignaturaDisplay(u: any): string {
    if (!u) return '-';
    const aid = u.asignatura_id || u.asignatura || u.id_asignatura || u.idAsignatura || null;
    if (aid) {
      const found = (this.asignaturas || []).find(a => String(a.id || a.idAsignatura || a.id_asignatura) === String(aid));
      if (found) return found.nombre || found.titulo || String(aid);
    }
    const mapped = this.userAsignMap[this.getUserKey(u)];
    if (mapped) return mapped;
    return '-';
  }
}

