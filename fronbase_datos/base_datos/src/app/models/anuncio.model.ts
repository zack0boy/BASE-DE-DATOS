export interface AnuncioModel {
  idAnuncio: number;
  idUsuario?: number;
  idSeccion?: number;
  idCarrera?: number;
  titulo?: string;
  contenido?: string;
  fecha?: string;
}
