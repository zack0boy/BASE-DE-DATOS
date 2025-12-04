export interface LogAdminModel {
  idLogAdmin: number;
  idUsuario?: number;
  accion?: string;
  tablaAfectada?: string;
  fechaAccion?: string;
  detalles?: string;
}
