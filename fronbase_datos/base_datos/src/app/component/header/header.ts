import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MensajeModal } from '../../components/mensaje-modal/mensaje-modal';
import { MensajesRecibidosModal } from '../../components/mensajes-recibidos-modal/mensajes-recibidos-modal';
import { MensajesInternosService } from '../../services/mensajes-internos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MensajeModal, MensajesRecibidosModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  currentUser: any = null;
  isDocente: boolean = false;
  showMensajeModal: boolean = false;
  showMensajesRecibidosModal: boolean = false;
  unreadCount: number = 0;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private mensajesService: MensajesInternosService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.isDocente = this.currentUser?.role === 42 || this.currentUser?.role === 1;
    this.loadUnreadCount();
  }

  loadUnreadCount() {
    if (!this.currentUser?.id) return;

    this.subscription.add(
      this.mensajesService.getByDestinatario(parseInt(this.currentUser.id)).subscribe({
        next: (data: any) => {
          const mensajes = Array.isArray(data) ? data : [];
          this.unreadCount = mensajes.filter((m: any) => !m.leido).length;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
