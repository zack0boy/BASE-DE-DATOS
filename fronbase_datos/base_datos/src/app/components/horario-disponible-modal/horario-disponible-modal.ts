import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-disponible-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-disponible-modal.html',
  styleUrl: './horario-disponible-modal.css',
})
export class HorarioDisponibleModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() docenteId: string = '';
  @Output() close = new EventEmitter<void>();

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horariosDisponibles: any[] = [];

  selectedDia: string = '';
  selectedHoraInicio: string = '08:00';
  selectedHoraFin: string = '09:00';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    if (this.dias.length > 0) {
      this.selectedDia = this.dias[0];
    }
  }

  closeModal() {
    this.resetForm();
    this.close.emit();
  }

  resetForm() {
    this.selectedDia = this.dias.length > 0 ? this.dias[0] : '';
    this.selectedHoraInicio = '08:00';
    this.selectedHoraFin = '09:00';
    this.errorMessage = '';
    this.successMessage = '';
  }

  agregarHorario() {
    if (!this.selectedDia || !this.selectedHoraInicio || !this.selectedHoraFin) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    // Validar que la hora fin sea mayor que la hora inicio
    if (this.selectedHoraFin <= this.selectedHoraInicio) {
      this.errorMessage = 'La hora final debe ser posterior a la hora inicial';
      return;
    }

    // Verificar si ya existe un horario para ese día y hora
    const existe = this.horariosDisponibles.some(
      h => h.dia === this.selectedDia &&
          h.horaInicio === this.selectedHoraInicio &&
          h.horaFin === this.selectedHoraFin
    );

    if (existe) {
      this.errorMessage = 'Ya existe un horario para este día y hora';
      return;
    }

    this.horariosDisponibles.push({
      dia: this.selectedDia,
      horaInicio: this.selectedHoraInicio,
      horaFin: this.selectedHoraFin,
    });

    this.errorMessage = '';
  }

  eliminarHorario(index: number) {
    this.horariosDisponibles.splice(index, 1);
  }

  guardarHorarios() {
    if (this.horariosDisponibles.length === 0) {
      this.errorMessage = 'Debes agregar al menos un horario disponible';
      return;
    }

    this.isLoading = true;
    // Aquí iría la llamada al servicio para guardar los horarios
    console.log('Guardando horarios:', this.horariosDisponibles);

    setTimeout(() => {
      this.successMessage = 'Horarios guardados correctamente';
      setTimeout(() => {
        this.closeModal();
      }, 1500);
    }, 1000);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
