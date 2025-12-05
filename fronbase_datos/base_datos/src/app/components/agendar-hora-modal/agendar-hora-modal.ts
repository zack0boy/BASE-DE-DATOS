import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendar-hora-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-hora-modal.html',
  styleUrl: './agendar-hora-modal.css',
})
export class AgendarHoraModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() docente: any = null;
  @Input() usuarioId: string = '';
  @Output() close = new EventEmitter<void>();

  // Horarios disponibles (ejemplo)
  horariosDisponibles = [
    { dia: 'Lunes', horas: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
    { dia: 'Martes', horas: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
    { dia: 'Miércoles', horas: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
    { dia: 'Jueves', horas: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
    { dia: 'Viernes', horas: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
  ];

  selectedDia: string = '';
  selectedHora: string = '';
  motivo: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    if (this.horariosDisponibles.length > 0) {
      this.selectedDia = this.horariosDisponibles[0].dia;
    }
  }

  closeModal() {
    this.resetForm();
    this.close.emit();
  }

  resetForm() {
    this.selectedDia = this.horariosDisponibles.length > 0 ? this.horariosDisponibles[0].dia : '';
    this.selectedHora = '';
    this.motivo = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  getHorasDisponibles() {
    const diaObj = this.horariosDisponibles.find(d => d.dia === this.selectedDia);
    return diaObj ? diaObj.horas : [];
  }

  agendarHora() {
    if (!this.selectedDia || !this.selectedHora || !this.motivo.trim()) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    // Aquí iría la llamada al servicio para guardar la cita
    console.log('Agendando cita:', {
      dia: this.selectedDia,
      hora: this.selectedHora,
      motivo: this.motivo,
      docente: this.docente?.id,
      usuario: this.usuarioId,
    });

    // Simulación de envío
    setTimeout(() => {
      this.successMessage = 'Cita agendada correctamente. El docente recibirá la solicitud.';
      setTimeout(() => {
        this.closeModal();
      }, 1500);
    }, 1000);
  }
}
