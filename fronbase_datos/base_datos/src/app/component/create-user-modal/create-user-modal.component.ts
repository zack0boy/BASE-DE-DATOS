import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent {
  @Input() isOpen: boolean = false;
  @Input() existingEmails: string[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formData = {
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    rol: ''
  };

  suggestedEmail: string = '';

  isFormValid(): boolean {
    return !!(this.formData.nombre && this.formData.apellido && this.formData.email && this.formData.rut && this.formData.rol);
  }

  onSave() {
    // if email empty, use suggested email
    if ((!this.formData.email || !this.formData.email.trim()) && this.suggestedEmail) {
      this.formData.email = this.suggestedEmail;
    }
    if (this.isFormValid()) {
      this.save.emit(this.formData);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.cancel.emit();
  }

  resetForm() {
    this.formData = { nombre: '', apellido: '', email: '', rut: '', rol: '' };
    this.suggestedEmail = '';
  }

  // Update suggested email based on nombre/apellido and existing emails
  updateSuggestedEmail() {
    const nombre = (this.formData.nombre || '').trim();
    const apellido = (this.formData.apellido || '').trim();
    const normalize = (s: string) => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');

    const first = normalize(nombre || '');
    const last = normalize(apellido || '');
    let base = (first + '.' + last).replace(/\.{2,}/g, '.').replace(/^\.|\.$/g, '');
    if (!base) base = 'usuario';
    const domain = '@ucm.cl';

    const existing = new Set((this.existingEmails || []).map(e => (e || '').toLowerCase()));
    const candidate = `${base}${domain}`;
    if (!existing.has(candidate)) {
      this.suggestedEmail = candidate;
      return;
    }
    for (let i = 1; i < 100; i++) {
      const suffix = '.' + ('0' + i).slice(-2);
      const c = `${base}${suffix}${domain}`;
      if (!existing.has(c)) {
        this.suggestedEmail = c;
        return;
      }
    }
    this.suggestedEmail = `${base}.${Date.now()}${domain}`;
  }
}
