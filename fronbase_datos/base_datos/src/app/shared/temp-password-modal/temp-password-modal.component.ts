import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temp-password-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="temp-modal-overlay">
      <div class="temp-modal-card card shadow">
        <div class="card-body">
          <h5 class="card-title">Clave temporal creada</h5>
          <p>La contraseña generada para el usuario es:</p>
          <pre class="temp-pass p-2 bg-light border">{{ password }}</pre>
          <div class="mt-3 d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary" (click)="copy()"><i class="bi bi-clipboard"></i> Copiar</button>
            <button class="btn btn-sm btn-primary" (click)="close()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.temp-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:1200}.temp-modal-card{max-width:420px;width:100%}.temp-pass{font-size:1.1rem;letter-spacing:1px}`
  ]
})
export class TempPasswordModalComponent {
  @Input() visible: boolean = false;
  @Input() password: string = '';
  @Output() closed = new EventEmitter<void>();
  @Output() copied = new EventEmitter<void>();

  copy() {
    try {
      navigator.clipboard?.writeText(this.password);
      this.copied.emit();
    } catch (e) {
      console.warn('Clipboard API no disponible', e);
      this.copied.emit();
    }
  }

  close() {
    this.closed.emit();
  }
}
