export interface MensajeInternoModel {
  idMensaje: number;
  idUsuarioEnvia?: number;
  idUsuarioRecibe?: number;
  contenido?: string;
  fecha?: string;
}
