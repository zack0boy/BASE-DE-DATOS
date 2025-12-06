import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajesInternosService } from '../../services/mensajes-internos.service';
import { ContentModerationService } from '../../services/content-moderation.service';

@Component({
  selector: 'app-mensaje-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensaje-modal.html',
  styleUrls: ['./mensaje-modal.css'],
})
export class MensajeModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() recipientId: string = '';
  @Input() recipientName: string = '';
  @Input() senderId: string = '';
  @Output() close = new EventEmitter<void>();

  mensaje: string = '';
  asunto: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private mensajesService: MensajesInternosService,
    private moderation: ContentModerationService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.resetForm();
    this.close.emit();
  }

  resetForm() {
    this.mensaje = '';
    this.asunto = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  sendMessage() {
    if (!this.mensaje.trim() || !this.asunto.trim()) {
      this.errorMessage = 'Por favor completa el asunto y mensaje';
      return;
    }
    // Validar contenido con el filtro de moderación
    const validacion = this.moderation.validarContenido(this.mensaje + ' ' + this.asunto);
    if (!validacion.esValido) {
      this.errorMessage = this.moderation.obtenerMensajeError(validacion.tipoViolacion, validacion.palabrasEncontradas);
      return;
    }

    this.isLoading = true;
    const mensajeData = {
      id_remitente: parseInt(this.senderId),
      id_destinatario: parseInt(this.recipientId),
      asunto: this.asunto,
      contenido: this.mensaje,
      fecha_envio: new Date().toISOString(),
      leido: false,
    };

    this.mensajesService.create(mensajeData).subscribe({
      next: () => {
        this.successMessage = 'Mensaje enviado correctamente';
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.errorMessage = 'Error al enviar el mensaje. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
