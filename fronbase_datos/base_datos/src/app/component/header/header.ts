import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MensajeModal } from '../../components/mensaje-modal/mensaje-modal';
import { MensajesRecibidosModal } from '../../components/mensajes-recibidos-modal/mensajes-recibidos-modal';
import { MensajesInternosService } from '../../services/mensajes-internos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MensajeModal, MensajesRecibidosModal],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit, OnDestroy {
  currentUser: any = null;
  isDocente: boolean = false;
  isAdmin: boolean = false;
  adminMode: boolean = false;
  showMensajeModal: boolean = false;
  showMensajesRecibidosModal: boolean = false;
  unreadCount: number = 0;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private mensajesService: MensajesInternosService
    , private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    const userRole = Number(this.currentUser?.role || this.currentUser?.id_rol || null);
    // Backend role IDs: 41=ESTUDIANTE, 42=DOCENTE, 43=SECRETARIA, 44=DIRECTOR, 45=ADMIN
    this.isDocente = userRole === 42;
    this.isAdmin = userRole === 45 || userRole === 43 || userRole === 44;
    console.log('Header - currentUser:', this.currentUser, 'userRole:', userRole, 'isAdmin:', this.isAdmin, 'isDocente:', this.isDocente);
    this.loadUnreadCount();
    // Restore admin mode from localStorage if set
    try {
      this.adminMode = !!localStorage.getItem('adminMode');
    } catch (e) {
      this.adminMode = false;
    }
  }

  loadUnreadCount() {
    if (!this.currentUser?.id) return;

    this.subscription.add(
      this.mensajesService.getByDestinatario(parseInt(this.currentUser.id)).subscribe({
        next: (data: any) => {
          const mensajes = Array.isArray(data) ? data : [];
          // Sanear elementos nulos y asegurar propiedad 'leido'
          this.unreadCount = mensajes.filter((m: any) => m && (m.leido === false || m.leido === 0 || m.leido === '0')).length;
        },
        error: (error) => console.error('Error cargando mensajes no leídos:', error),
      })
    );
  }

  openMensajeModal() {
    this.showMensajeModal = true;
  }

  closeMensajeModal() {
    this.showMensajeModal = false;
    this.loadUnreadCount();
  }

  openMensajesRecibidos() {
    this.showMensajesRecibidosModal = true;
  }

  closeMensajesRecibidos() {
    this.showMensajesRecibidosModal = false;
    this.loadUnreadCount();
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  toggleAdminMode() {
    this.adminMode = !this.adminMode;
    try {
      if (this.adminMode) {
        localStorage.setItem('adminMode', '1');
        // Enter management view
        this.router.navigate(['/admin-manage']);
      } else {
        // Exit management mode and return to admin-inicio (home for admins)
        localStorage.removeItem('adminMode');
        this.router.navigate(['/admin-inicio']);
      }
    } catch (e) {
      console.warn('toggleAdminMode error', e);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
