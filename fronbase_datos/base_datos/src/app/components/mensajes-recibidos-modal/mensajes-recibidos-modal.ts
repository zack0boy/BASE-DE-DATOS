import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesInternosService } from '../../services/mensajes-internos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes-recibidos-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes-recibidos-modal.html',
  styleUrl: './mensajes-recibidos-modal.css',
})
export class MensajesRecibidosModal implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() usuarioId: string = '';
  @Output() close = new EventEmitter<void>();

  mensajes: any[] = [];
  isLoading: boolean = false;
  selectedMensaje: any = null;
  private subscription = new Subscription();

  constructor(private mensajesService: MensajesInternosService) {}

  ngOnInit() {}

  loadMensajes() {
    if (!this.usuarioId) return;

    this.isLoading = true;
    this.subscription.add(
      this.mensajesService.getByDestinatario(parseInt(this.usuarioId)).subscribe({
        next: (data: any) => {
          this.mensajes = Array.isArray(data) ? data : [];
          console.log('Mensajes recibidos:', this.mensajes);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error cargando mensajes:', error);
          this.isLoading = false;
        },
      })
    );
  }

  openModal() {
    this.loadMensajes();
  }

  closeModal() {
    this.selectedMensaje = null;
    this.close.emit();
  }

  selectMensaje(mensaje: any) {
    this.selectedMensaje = mensaje;
    // Marcar como leído
    if (!mensaje.leido) {
      this.mensajesService.update(mensaje.id, { leido: true }).subscribe({
        next: () => {
          mensaje.leido = true;
        },
        error: (error) => console.error('Error marcando como leído:', error),
      });
    }
  }

  deleteMensaje(mensaje: any) {
    if (confirm('¿Deseas eliminar este mensaje?')) {
      this.mensajesService.delete(mensaje.id).subscribe({
        next: () => {
          this.mensajes = this.mensajes.filter((m) => m.id !== mensaje.id);
          this.selectedMensaje = null;
        },
        error: (error) => console.error('Error eliminando mensaje:', error),
      });
    }
  }

  getUnreadCount(): number {
    return this.mensajes.filter((m) => !m.leido).length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
