export interface LogAutenticacionModel {
  idLogAuth: number;
  idUsuario?: number;
  fechaIntento?: string;
  resultado?: string;
  ipAddress?: string;
}
