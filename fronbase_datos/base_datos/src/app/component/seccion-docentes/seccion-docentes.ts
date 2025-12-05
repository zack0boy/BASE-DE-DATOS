import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MensajeModal } from '../../components/mensaje-modal/mensaje-modal';
import { AgendarHoraModal } from '../../components/agendar-hora-modal/agendar-hora-modal';
import { HorarioDisponibleModal } from '../../components/horario-disponible-modal/horario-disponible-modal';

@Component({
  selector: 'app-seccion-docentes',
  standalone: true,
  imports: [CommonModule, MensajeModal, AgendarHoraModal, HorarioDisponibleModal],
  templateUrl: './seccion-docentes.html',
  styleUrls: ['./seccion-docentes.css']
})
export class SeccionDocentesComponent implements OnInit {
  @Input() teachers: any[] = [];

  currentUser: any = null;
  isDocente: boolean = false;
  selectedDocente: any = null;
  showMensajeModal: boolean = false;
  showAgendarHoraModal: boolean = false;
  showHorarioModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.isDocente = this.currentUser?.role === 42 || this.currentUser?.role === 1;
  }

  enviarMensaje(docente: any) {
    this.selectedDocente = docente;
    this.showMensajeModal = true;
  }

  agendarHora(docente: any) {
    this.selectedDocente = docente;
    this.showAgendarHoraModal = true;
  }

  abrirHorarioModal() {
    this.showHorarioModal = true;
  }

  closeMensajeModal() {
    this.showMensajeModal = false;
    this.selectedDocente = null;
  }

  closeAgendarHoraModal() {
    this.showAgendarHoraModal = false;
    this.selectedDocente = null;
  }

  closeHorarioModal() {
    this.showHorarioModal = false;
  }
}
