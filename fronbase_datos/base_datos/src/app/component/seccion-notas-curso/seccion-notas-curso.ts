import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PonderacionNota {
  id: string;
  nombre: string;
  nota: number | null;
  ponderacion: number | null;
  resultado: number | null;
}

@Component({
  selector: 'app-seccion-notas-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seccion-notas-curso.html',
  styleUrl: './seccion-notas-curso.css'
})
export class SeccionNotasCursoComponent {
  ponderaciones: PonderacionNota[] = [];
  notaFinal: number | null = null;

  get sumaPonderaciones(): number {
    return this.ponderaciones.reduce((sum, p) => sum + (p.ponderacion || 0), 0);
  }

  constructor() {
    this.agregarPonderacion();
  }

  agregarPonderacion(): void {
    const id = `pond-${Date.now()}-${Math.random()}`;
    this.ponderaciones.push({
      id,
      nombre: `Evaluación ${this.ponderaciones.length + 1}`,
      nota: null,
      ponderacion: null,
      resultado: null
    });
  }

  calcularPonderacion(index: number): void {
    const pond = this.ponderaciones[index];

    if (pond.nota === null || pond.ponderacion === null) {
      alert('Por favor ingresa la nota y la ponderación');
      return;
    }

    if (pond.nota < 0 || pond.nota > 7) {
      alert('La nota debe estar entre 0 y 7');
      return;
    }

    if (pond.ponderacion < 0 || pond.ponderacion > 100) {
      alert('La ponderación debe estar entre 0 y 100%');
      return;
    }

    // Calcular: (nota * ponderación) / 100
    pond.resultado = (pond.nota * pond.ponderacion) / 100;
  }

  calcularNotaFinal(): void {
    const ponderacionesValidas = this.ponderaciones.filter(p => p.resultado !== null);

    if (ponderacionesValidas.length === 0) {
      alert('Debes calcular al menos una ponderación');
      return;
    }

    // Verificar que la suma de ponderaciones sea 100
    const sumaPonderaciones = this.ponderaciones.reduce((sum, p) => sum + (p.ponderacion || 0), 0);
    if (sumaPonderaciones !== 100) {
      alert(`La suma de ponderaciones debe ser 100%. Actual: ${sumaPonderaciones}%`);
      return;
    }

    // Sumar todos los resultados para obtener la nota final
    this.notaFinal = ponderacionesValidas.reduce((sum, p) => sum + (p.resultado || 0), 0);
  }

  eliminarPonderacion(index: number): void {
    if (this.ponderaciones.length > 1) {
      this.ponderaciones.splice(index, 1);
      this.notaFinal = null;
    } else {
      alert('Debe haber al menos una evaluación');
    }
  }

  limpiarPonderacion(index: number): void {
    this.ponderaciones[index] = {
      ...this.ponderaciones[index],
      nota: null,
      ponderacion: null,
      resultado: null
    };
    this.notaFinal = null;
  }

  limpiarTodo(): void {
    this.ponderaciones.forEach(p => {
      p.nota = null;
      p.ponderacion = null;
      p.resultado = null;
    });
    this.notaFinal = null;
  }
}
