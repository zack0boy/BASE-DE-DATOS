import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { FormsModule } from '@angular/forms';
import { AsignaturasService } from '../../services/asignaturas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AsignacionesDocenteService } from '../../services/asignaciones-docente.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { SeccionesService } from '../../services/secciones.service';
import { CarrerasService } from '../../services/carreras.service';
// HeroBannerComponent removed — shell provides hero/banner UI
import { LoadingWrapperComponent } from '../../shared/loading-wrapper/loading-wrapper.component';
import { TempPasswordModalComponent } from '../../shared/temp-password-modal/temp-password-modal.component';
import { AdminManageShellComponent } from '../../component/admin-manage-shell/admin-manage-shell.component';
import { ActivatedRoute, Router } from '@angular/router';

const ROLE_CONSTANTS = {
  ESTUDIANTE: 41,
  DOCENTE: 42,
  SECRETARIA: 43,
  DIRECTOR: 44,
  ADMIN: 45
};

@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [CommonModule, Header, Footer, FormsModule, LoadingWrapperComponent, TempPasswordModalComponent, AdminManageShellComponent],
  templateUrl: './admin-manage.html',
  styleUrls: ['./admin-manage.css']
})
export class AdminManage implements OnInit {
  asignaturas: any[] = [];
  usuarios: any[] = [];
  asignaciones: any[] = [];
  inscripciones: any[] = [];
  secciones: any[] = [];
  carreras: any[] = [];

  // Filtered lists by role
  estudiantes: any[] = [];
  docentes: any[] = [];
  secretarias: any[] = [];
  directores: any[] = [];
  admins: any[] = [];

  // UI state
  selectedAsignatura: any = null;
  selectedDocenteId: number | null = null;
  selectedEstudianteId: number | null = null;
  loading: boolean = true;
  message: string = '';
  error: string | null = null;
  preselectAsignaturaId: string | null = null;
  activeTab: string = 'estudiantes';

  // Autocomplete
  asignaturaSearch: string = '';
  filteredAsignaturas: any[] = [];
  showAsignaturaDropdown: boolean = false;

  // User management UI
  showUserForm: boolean = false;
  editingUser: any = null;
  // Modal to display generated temporary password after creating user
  showTempPasswordModal: boolean = false;
  tempPasswordValue: string = '';
  newUser: any = {
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    id_rol: ROLE_CONSTANTS.ESTUDIANTE,
    asignatura_id: null,
    password: ''
  };

  // Per-user active action (tabs in action cell)
  activeActionFor: Record<string, string> = {};

  // Carreras edit modal
  showCarreraEditModal: boolean = false;
  editingCarrera: any = null;
  newCarrera: any = { nombre: '', codigo: '', descripcion: '', duracion: 8 };

  // Secciones edit modal
  showSeccionEditModal: boolean = false;
  editingSeccion: any = null;
  newSeccion: any = { nombre: '', asignatura_id: null, carrera_id: null };

  // Asignaturas edit modal
  showAsignaturaEditModal: boolean = false;
  editingAsignatura: any = null;
  editAsignaturaData: any = { nombre: '', codigo: '', horas: 0, descripcion: '' };

  // copy/close helpers for temp password modal
  copyTempPassword(): void {
    try {
      navigator.clipboard?.writeText(this.tempPasswordValue);
      this.message = 'Clave temporal copiada al portapapeles';
    } catch (e) {
      // fallback: select and prompt
      console.warn('Clipboard API no disponible', e);
      this.message = 'Copia manual: ' + this.tempPasswordValue;
    }
  }

  closeTempPasswordModal(): void {
    this.showTempPasswordModal = false;
    this.tempPasswordValue = '';
  }

  // Asignatura creation
  newAsignatura: any = { nombre: '', codigo: '', secciones: [] };
  newSectionName: string = '';

  constructor(
    private asignaturasService: AsignaturasService,
    private usuariosService: UsuariosService,
    private asignacionesService: AsignacionesDocenteService,
    private inscripcionesService: InscripcionesService,
    private seccionesService: SeccionesService,
    private carrerasService: CarrerasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preselectAsignaturaId = this.route.snapshot.queryParamMap.get('asignatura');
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;
    this.asignaturasService.getAll().subscribe(
      (a: any) => {
        this.asignaturas = a || [];
        this.filteredAsignaturas = [...this.asignaturas];
        if (this.preselectAsignaturaId && !this.selectedAsignatura) {
          const match = this.asignaturas.find(x => String(x.idAsignatura || x.id_asignatura || x.id) === String(this.preselectAsignaturaId));
          if (match) this.selectAsignatura(match);
        }
      },
      (e: any) => { console.error('Error cargando asignaturas', e); this.error = 'Error cargando asignaturas'; }
    );

    this.usuariosService.getAll().subscribe(
      (u: any) => {
        this.usuarios = u || [];
        this.filterUsersByRole();
      },
      (e: any) => { console.error('Error cargando usuarios', e); this.error = 'Error cargando usuarios'; }
    );

    this.asignacionesService.getAll().subscribe(
      (as: any) => { this.asignaciones = as || []; },
      (e: any) => { console.error('Error cargando asignaciones', e); this.error = 'Error cargando asignaciones'; }
    );

    this.inscripcionesService.getAll().subscribe(
      (ins: any) => { this.inscripciones = ins || []; },
      (e: any) => { console.error('Error cargando inscripciones', e); this.error = 'Error cargando inscripciones'; }
    );

    this.seccionesService.getAll().subscribe(
      (sec: any) => { this.secciones = sec || []; },
      (e: any) => { console.error('Error cargando secciones', e); this.error = 'Error cargando secciones'; }
    );

    this.carrerasService.getAll().subscribe(
      (car: any) => { this.carreras = car || []; },
      (e: any) => { console.error('Error cargando carreras', e); this.error = 'Error cargando carreras'; }
    );

    this.loading = false;
  }

  filterUsersByRole(): void {
    this.estudiantes = this.usuarios.filter(u => this.getUserRole(u) === ROLE_CONSTANTS.ESTUDIANTE);
    this.docentes = this.usuarios.filter(u => this.getUserRole(u) === ROLE_CONSTANTS.DOCENTE);
    this.secretarias = this.usuarios.filter(u => this.getUserRole(u) === ROLE_CONSTANTS.SECRETARIA);
    this.directores = this.usuarios.filter(u => this.getUserRole(u) === ROLE_CONSTANTS.DIRECTOR);
    this.admins = this.usuarios.filter(u => this.getUserRole(u) === ROLE_CONSTANTS.ADMIN);
  }

  getUserRole(user: any): number {
    return Number(user.role || user.id_rol || user.rol?.id_rol || 0);
  }

  getRoleName(roleId: number): string {
    const roleMap: any = {
      41: 'Estudiante',
      42: 'Docente',
      43: 'Secretaria',
      44: 'Director',
      45: 'Admin'
    };
    return roleMap[roleId] || 'Desconocido';
  }

  selectAsignatura(asignatura: any): void {
    this.selectedAsignatura = asignatura;
    this.asignaturaSearch = asignatura.nombre || '';
    this.showAsignaturaDropdown = false;
    this.message = '';
  }

  // Autocomplete para asignatura
  onAsignaturaSearchChange(term: string): void {
    this.asignaturaSearch = term;
    if (term.length === 0) {
      this.filteredAsignaturas = [...this.asignaturas];
    } else {
      const lower = term.toLowerCase();
      this.filteredAsignaturas = this.asignaturas.filter(a =>
        (a.nombre || '').toLowerCase().includes(lower) ||
        (a.codigo || '').toLowerCase().includes(lower)
      );
    }
    this.showAsignaturaDropdown = true;
  }

  clearAsignatura(): void {
    this.selectedAsignatura = null;
    this.asignaturaSearch = '';
    this.showAsignaturaDropdown = false;
  }

  getAsignacionesForSelected(): any[] {
    if (!this.selectedAsignatura) return this.asignaciones || [];
    const aid = this.selectedAsignatura.idAsignatura || this.selectedAsignatura.id_asignatura || this.selectedAsignatura.id;
    return (this.asignaciones || []).filter(a => {
      const asigId = a.asignatura || a.id_asignatura || a.idAsignatura || a.asignatura_id || null;
      return String(asigId) === String(aid);
    });
  }

  getInscripcionesForSelected(): any[] {
    if (!this.selectedAsignatura) return this.inscripciones || [];
    const aid = this.selectedAsignatura.idAsignatura || this.selectedAsignatura.id_asignatura || this.selectedAsignatura.id;
    return (this.inscripciones || []).filter(i => {
      const insA = i.asignatura || i.id_asignatura || i.idAsignatura || i.asignatura_id || null;
      return String(insA) === String(aid);
    });
  }

  // Cambiar rol de usuario
  changeUserRole(user: any, newRoleId: number): void {
    if (!confirm(`¿Cambiar el rol de ${user.nombre || user.name} a ${this.getRoleName(newRoleId)}?`)) return;

    // Aquí iría la llamada a la API para actualizar el rol
    // Por ahora, simulamos la actualización en el cliente
    user.id_rol = newRoleId;
    user.role = newRoleId;
    this.message = `Rol actualizado para ${user.nombre || user.name}`;
    this.filterUsersByRole();

    // intentar persistir en backend
    const uid = user.id || user.idUsuario || user.id_usuario || user.idUsuario;
    if (uid) {
      const payload: any = { id_rol: newRoleId };
      this.usuariosService.update(Number(uid), payload).subscribe({
        next: () => {
          this.message = `Rol actualizado para ${user.nombre || user.name}`;
          this.loadAll();
        },
        error: (e) => {
          console.error('Error actualizando rol en backend', e);
          this.message = 'Error al actualizar rol en servidor';
        }
      });
    }
  }

  // --- User CRUD ---
  openCreateUser(): void {
    this.showUserForm = true;
    this.editingUser = null;
    this.newUser = { nombre: '', apellido: '', email: '', rut: '', id_rol: ROLE_CONSTANTS.ESTUDIANTE, asignatura_id: null, password: '' };
  }

  openEditUser(user: any): void {
    this.showUserForm = true;
    this.editingUser = user;
    this.newUser = { ...user };
  }

  cancelUserForm(): void {
    this.showUserForm = false;
    this.editingUser = null;
    this.newUser = { nombre: '', apellido: '', email: '', rut: '', id_rol: ROLE_CONSTANTS.ESTUDIANTE, asignatura_id: null, password: '' };
  }

  generateTempPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let pass = '';
    for (let i = 0; i < 10; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    return pass;
  }

  saveUser(): void {
    // validate minimal fields
    if (!this.newUser.nombre || !this.newUser.email) {
      this.message = 'Nombre y email son obligatorios';
      return;
    }

    // If creating, generate temporary password if none
    if (!this.editingUser) {
      if (!this.newUser.password) this.newUser.password = this.generateTempPassword();
      const generated = this.newUser.password;
      this.usuariosService.create(this.newUser).subscribe({
        next: () => {
          this.message = 'Usuario creado correctamente';
          // show modal with generated password (frontend-only, no email)
          this.tempPasswordValue = generated;
          this.showTempPasswordModal = true;
          this.cancelUserForm();
          this.loadAll();
        },
        error: (e) => { console.error('Error creando usuario', e); this.message = 'Error creando usuario'; }
      });
      return;
    }

    // Editing existing user
    const uid = this.editingUser.id || this.editingUser.idUsuario || this.editingUser.id_usuario;
    if (!uid) { this.message = 'ID de usuario inválido'; return; }
    const payload: any = { ...this.newUser };
    // avoid sending nested objects that break API
    delete payload.id;
    delete payload.idUsuario;
    this.usuariosService.update(Number(uid), payload).subscribe({
      next: () => { this.message = 'Usuario actualizado'; this.cancelUserForm(); this.loadAll(); },
      error: (e) => { console.error('Error actualizando usuario', e); this.message = 'Error actualizando usuario'; }
    });
  }

  deleteUser(user: any): void {
    if (!confirm(`¿Eliminar usuario ${user.nombre || user.name}? Esta acción es irreversible.`)) return;
    const uid = user.id || user.idUsuario || user.id_usuario;
    if (!uid) return;
    this.usuariosService.delete(Number(uid)).subscribe({
      next: () => { this.message = 'Usuario eliminado'; this.loadAll(); },
      error: (e) => { console.error('Error eliminando usuario', e); this.message = 'Error eliminando usuario'; }
    });
  }

  // Assign/change the main asignatura for a user
  changeUserAsignatura(user: any, asignaturaId: any): void {
    const uid = user.id || user.idUsuario || user.id_usuario;
    if (!uid) return;

    // Normalize asignaturaId if an object was passed
    let newAsignId: any = asignaturaId;
    if (asignaturaId && typeof asignaturaId === 'object') {
      newAsignId = asignaturaId.id || asignaturaId.idAsignatura || asignaturaId.id_asignatura || asignaturaId.asignatura || null;
    }

    // Only send asignatura_id if it's different from current
    if (user.asignatura_id === newAsignId) {
      this.message = 'El usuario ya tiene esta asignatura asignada';
      return;
    }

    const payload: any = { asignatura_id: newAsignId };
     this.usuariosService.update(Number(uid), payload).subscribe({
       next: () => {
         this.message = 'Asignatura del usuario actualizada';
         this.loadAll();
       },
       error: (e) => {
         console.error('Error actualizando asignatura del usuario', e);
         this.message = 'Error actualizando asignatura: ' + (e?.error?.message || 'Error del servidor');
       }
     });
  }

  // --- Asignaturas CRUD (basic) ---
  addSectionToNewAsignatura(): void {
    if (!this.newSectionName) return;
    this.newAsignatura.secciones = this.newAsignatura.secciones || [];
    this.newAsignatura.secciones.push({ nombre: this.newSectionName });
    this.newSectionName = '';
  }

  removeSectionFromNewAsignatura(index: number): void {
    if (!this.newAsignatura.secciones) return;
    this.newAsignatura.secciones.splice(index, 1);
  }

  createAsignatura(): void {
    if (!this.newAsignatura.nombre) { this.message = 'El nombre de la asignatura es obligatorio'; return; }
    const payload: any = { nombre: this.newAsignatura.nombre, codigo: this.newAsignatura.codigo || '', secciones: this.newAsignatura.secciones || [] };
    this.asignaturasService.create(payload).subscribe({
      next: () => { this.message = 'Asignatura creada'; this.newAsignatura = { nombre: '', codigo: '', secciones: [] }; this.loadAll(); },
      error: (e) => { console.error('Error creando asignatura', e); this.message = 'Error creando asignatura'; }
    });
  }

  assignDocente(): void {
    if (!this.selectedAsignatura || !this.selectedDocenteId) return;
    const payload = { usuario: this.selectedDocenteId, asignatura: this.selectedAsignatura.idAsignatura || this.selectedAsignatura.id_asignatura || this.selectedAsignatura.id };
    this.asignacionesService.create(payload).subscribe({
      next: () => {
        this.message = 'Docente asignado correctamente';
        this.selectedDocenteId = null;
        this.loadAll();
      },
      error: (e) => {
        console.error('Error asignando docente', e);
        this.message = 'Error asignando docente';
      }
    });
  }

  removeAsignacion(asig: any): void {
    if (!confirm('¿Eliminar asignación? Esta acción es irreversible.')) return;
    const id = asig.id || asig.idAsignacion || asig.id_asignacion || asig.id_asignatura || null;
    if (!id) return;
    this.asignacionesService.delete(Number(id)).subscribe({
      next: () => { this.message = 'Asignación eliminada'; this.loadAll(); },
      error: (e) => { console.error('Error eliminando asignación', e); this.message = 'Error eliminando asignación'; }
    });
  }

  assignEstudiante(): void {
    if (!this.selectedAsignatura || !this.selectedEstudianteId) return;
    const payload = { usuario: this.selectedEstudianteId, asignatura: this.selectedAsignatura.idAsignatura || this.selectedAsignatura.id_asignatura || this.selectedAsignatura.id };
    this.inscripcionesService.create(payload).subscribe({
      next: () => { this.message = 'Estudiante inscrito correctamente'; this.selectedEstudianteId = null; this.loadAll(); },
      error: (e) => { console.error('Error inscribiendo estudiante', e); this.message = 'Error inscribiendo estudiante'; }
    });
  }

  removeInscripcion(insc: any): void {
    if (!confirm('¿Eliminar inscripción del estudiante?')) return;
    const id = insc.id || insc.idInscripcion || insc.id_inscripcion || null;
    if (!id) return;
    this.inscripcionesService.delete(Number(id)).subscribe({
      next: () => { this.message = 'Inscripción eliminada'; this.loadAll(); },
      error: (e) => { console.error('Error eliminando inscripcion', e); this.message = 'Error eliminando inscripcion'; }
    });
  }

  // --- Carreras CRUD ---
  createCarrera(carrera: any): void {
    if (!carrera || !carrera.nombre) {
      this.message = 'El nombre de la carrera es obligatorio';
      return;
    }
    const payload: any = {
      nombre: carrera.nombre,
      codigo: carrera.codigo || '',
      descripcion: carrera.descripcion || '',
      duracion: carrera.duracion || 8
    };
    this.carrerasService.create(payload).subscribe({
      next: () => {
        this.message = 'Carrera creada correctamente';
        this.loadAll();
      },
      error: (e) => {
        console.error('Error creando carrera', e);
        this.message = 'Error creando carrera: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  editCarrera(carrera: any): void {
    this.editingCarrera = carrera;
    this.newCarrera = { ...carrera };
    this.showCarreraEditModal = true;
  }

  saveCarrera(): void {
    if (!this.editingCarrera) {
      this.message = 'Error: no hay carrera seleccionada';
      return;
    }
    if (!this.newCarrera || !this.newCarrera.nombre) {
      this.message = 'El nombre de la carrera es obligatorio';
      return;
    }
    const cid = this.editingCarrera.id || this.editingCarrera.idCarrera || this.editingCarrera.id_carrera;
    if (!cid) {
      this.message = 'ID de carrera inválido';
      return;
    }
    const payload: any = {
      nombre: this.newCarrera.nombre,
      codigo: this.newCarrera.codigo || '',
      descripcion: this.newCarrera.descripcion || '',
      duracion: this.newCarrera.duracion || 8
    };
    this.carrerasService.update(Number(cid), payload).subscribe({
      next: () => {
        this.message = 'Carrera actualizada correctamente';
        this.closeCarreraEditModal();
        this.loadAll();
      },
      error: (e) => {
        console.error('Error actualizando carrera', e);
        this.message = 'Error actualizando carrera: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  closeCarreraEditModal(): void {
    this.showCarreraEditModal = false;
    this.editingCarrera = null;
    this.newCarrera = { nombre: '', codigo: '', descripcion: '', duracion: 8 };
  }

  deleteCarrera(carrera: any): void {
    if (!confirm(`¿Eliminar carrera ${carrera.nombre}? Esta acción es irreversible.`)) return;
    const cid = carrera.id || carrera.idCarrera || carrera.id_carrera;
    if (!cid) {
      this.message = 'ID de carrera inválido';
      return;
    }
    this.carrerasService.delete(Number(cid)).subscribe({
      next: () => {
        this.message = 'Carrera eliminada correctamente';
        this.loadAll();
      },
      error: (e) => {
        console.error('Error eliminando carrera', e);
        this.message = 'Error eliminando carrera: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  // --- Secciones CRUD ---
  createSection(section: any): void {
    if (!section || !section.nombre) {
      this.message = 'El nombre de la sección es obligatorio';
      return;
    }
    const payload: any = {
      nombre: section.nombre,
      asignatura_id: section.asignatura_id || null,
      carrera_id: section.carrera_id || null
    };
    this.seccionesService.create(payload).subscribe({
      next: () => {
        this.message = 'Sección creada correctamente';
        this.loadAll();
      },
      error: (e) => {
        console.error('Error creando sección', e);
        this.message = 'Error creando sección: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  editSection(section: any): void {
    this.editingSeccion = section;
    this.newSeccion = { ...section };
    this.showSeccionEditModal = true;
  }

  saveSection(): void {
    if (!this.editingSeccion) {
      this.message = 'Error: no hay sección seleccionada';
      return;
    }
    if (!this.newSeccion || !this.newSeccion.nombre) {
      this.message = 'El nombre de la sección es obligatorio';
      return;
    }
    const sid = this.editingSeccion.id || this.editingSeccion.idSeccion || this.editingSeccion.id_seccion;
    if (!sid) {
      this.message = 'ID de sección inválido';
      return;
    }
    const payload: any = {
      nombre: this.newSeccion.nombre,
      asignatura_id: this.newSeccion.asignatura_id || null,
      carrera_id: this.newSeccion.carrera_id || null
    };
    this.seccionesService.update(Number(sid), payload).subscribe({
      next: () => {
        this.message = 'Sección actualizada correctamente';
        this.closeSeccionEditModal();
        this.loadAll();
      },
      error: (e) => {
        console.error('Error actualizando sección', e);
        this.message = 'Error actualizando sección: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  closeSeccionEditModal(): void {
    this.showSeccionEditModal = false;
    this.editingSeccion = null;
    this.newSeccion = { nombre: '', asignatura_id: null, carrera_id: null };
  }

  deleteSection(section: any): void {
    if (!confirm(`¿Eliminar sección ${section.nombre}? Esta acción es irreversible.`)) return;
    const sid = section.id || section.idSeccion || section.id_seccion;
    if (!sid) {
      this.message = 'ID de sección inválido';
      return;
    }
    this.seccionesService.delete(Number(sid)).subscribe({
      next: () => {
        this.message = 'Sección eliminada correctamente';
        this.loadAll();
      },
      error: (e) => {
        console.error('Error eliminando sección', e);
        this.message = 'Error eliminando sección: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  // --- Asignaturas CRUD (edit/delete handlers) ---
  editAsignatura(asignatura: any): void {
    this.editingAsignatura = asignatura;
    this.editAsignaturaData = {
      nombre: asignatura.nombre || '',
      codigo: asignatura.codigo || '',
      horas: asignatura.horas || 0,
      descripcion: asignatura.descripcion || ''
    };
    this.showAsignaturaEditModal = true;
  }

  saveAsignatura(): void {
    if (!this.editingAsignatura) {
      this.message = 'Error: no hay asignatura seleccionada';
      return;
    }
    if (!this.editAsignaturaData || !this.editAsignaturaData.nombre) {
      this.message = 'El nombre de la asignatura es obligatorio';
      return;
    }
    const aid = this.editingAsignatura.id || this.editingAsignatura.idAsignatura || this.editingAsignatura.id_asignatura;
    if (!aid) {
      this.message = 'ID de asignatura inválido';
      return;
    }
    const payload: any = {
      nombre: this.editAsignaturaData.nombre,
      codigo: this.editAsignaturaData.codigo || '',
      horas: this.editAsignaturaData.horas || 0,
      descripcion: this.editAsignaturaData.descripcion || ''
    };
    this.asignaturasService.update(Number(aid), payload).subscribe({
      next: () => {
        this.message = 'Asignatura actualizada correctamente';
        this.closeAsignaturaEditModal();
        this.loadAll();
      },
      error: (e) => {
        console.error('Error actualizando asignatura', e);
        this.message = 'Error actualizando asignatura: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }

  closeAsignaturaEditModal(): void {
    this.showAsignaturaEditModal = false;
    this.editingAsignatura = null;
    this.editAsignaturaData = { nombre: '', codigo: '', horas: 0, descripcion: '' };
  }

  deleteAsignatura(asignatura: any): void {
    if (!confirm(`¿Eliminar asignatura ${asignatura.nombre}? Esta acción es irreversible.`)) return;
    const aid = asignatura.id || asignatura.idAsignatura || asignatura.id_asignatura;
    if (!aid) {
      this.message = 'ID de asignatura inválido';
      return;
    }
    this.asignaturasService.delete(Number(aid)).subscribe({
      next: () => {
        this.message = 'Asignatura eliminada correctamente';
        this.loadAll();
      },
      error: (e) => {
        console.error('Error eliminando asignatura', e);
        this.message = 'Error eliminando asignatura: ' + (e?.error?.message || e?.message || 'Error desconocido');
      }
    });
  }
}
