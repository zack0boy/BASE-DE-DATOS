export interface UsuarioModel {
  idUsuario: number;
  idRol?: number;
  nombre?: string;
  apellido?: string;
  rut?: string;
  email?: string;
  password?: string;
  fechaNac?: string;
  estado?: string;
  createdAt?: string;
}
