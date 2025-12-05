export interface Curso {
  progreso: number;
  id_asignatura: number;
  id_carrera: number;
  nombre: string;
  codigo: string;
  carrera_nombre?: string;
  id: string;
  title: string;
  location: string;
  period: string;
  section: string;
  description: string;
  seccion: string;
  descripcion: string;
  teachers: string[];
  programUrl: string;
  planningUrl: string;
  horario?: string;
  aula?: string;
  creditos?: number;
}

export interface CursoDetalle extends Curso {
}

export interface MaterialCurso {
  id: string;
  titulo: string;
  tipo: 'documento' | 'presentacion' | 'video' | 'enlace' | 'otro';
  url: string;
  fecha: string;
  descripcion?: string;
  tamano?: string;
}

export interface Docente {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  fotoUrl?: string;
  descripcion?: string;
  horarioAtencion?: string;
}

export interface ProgramaCurso {
  id: string;
  objetivos: string;
  contenidos: string[];
  evaluacion: string;
  bibliografia: string[];
  fechaActualizacion?: string;
  competencias?: string[];
  metodologia?: string;
}

export interface ActividadCurso {
  id: string;
  titulo: string;
  tipo: 'tarea' | 'examen' | 'proyecto' | 'otro';
  descripcion: string;
  fechaEntrega: string;
  fechaPublicacion: string;
  puntos?: number;
  estado?: 'pendiente' | 'entregado' | 'calificado';
  calificacion?: number;
  comentarios?: string;
}

export interface AnuncioCurso {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  autor: string;
  adjuntos?: {
    nombre: string;
    url: string;
    tipo: string;
  }[];
}

export interface CalificacionEstudiante {
  actividadId: string;
  actividadNombre: string;
  fechaEntrega: string;
  fechaCalificacion?: string;
  puntajeObtenido?: number;
  puntajeTotal: number;
  comentarios?: string;
  retroalimentacion?: string;
}

export interface RecursoCurso {
  id: string;
  titulo: string;
  tipo: 'enlace' | 'documento' | 'video' | 'imagen' | 'otro';
  url: string;
  descripcion?: string;
  fechaAgregado: string;
  esObligatorio: boolean;
}
