import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  login(rut: string, password: string): Observable<any> {
    console.log('AuthService - Attempting login for user:', rut);
    return this.api.create('login', { rut, password }).pipe(
      tap({
        next: (res: any) => {
          console.log('AuthService - Login response completa:', res);

          // Intentar diferentes formatos de respuesta
          let userObj = null;

          // Formato 1: res.user.id_usuario (nested)
          if (res?.user?.id_usuario) {
            userObj = res.user;
          }
          // Formato 2: res.id_usuario (direct - el que vimos en los logs)
          else if (res?.id_usuario) {
            userObj = res;
          }
          // Formato 3: res tiene directamente los datos del usuario
          else if (res?.id_usuario || res?.rut) {
            userObj = res;
          }

          if (userObj && (userObj.id_usuario || userObj.id)) {
            // Store token and user data
            localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
            // soportar respuesta donde el rol viene anidado en user.rol.id_rol
            let roleValue = userObj.id_rol || userObj.role || userObj.rol?.id_rol || null;
            // Si no hay id numérico, intentar mapear por nombre del rol
            const roleName = userObj.rol?.nombre_rol || userObj.nombre_rol || userObj.role_name || null;
            if (!roleValue && roleName) {
              const name = String(roleName).toUpperCase();
              const roleMap: Record<string, number> = {
                'ESTUDIANTE': 41,
                'STUDENT': 41,
                'DOCENTE': 42,
                'TEACHER': 42,
                'SECRETARIA': 43,
                'SECRETARY': 43,
                'DIRECTOR': 44,
                'ADMIN': 45,
                'ADMINISTRADOR': 45
              };
              roleValue = roleMap[name] || roleValue || null;
            }

            const userData = {
              id: userObj.id_usuario || userObj.id,
              name: userObj.nombre || userObj.name,
              lastName: userObj.apellido || userObj.lastName || '',
              email: userObj.email || '',
              role: roleValue,
              id_rol: roleValue
            };
            localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
            console.log('AuthService - Login successful for user ID:', userData.id, 'Role:', userData.role, 'User data:', userData);
            // Log stored localStorage for easier debugging in browser console
            try {
              console.log('AuthService - Stored user_data:', localStorage.getItem(this.USER_KEY));
            } catch (e) {
              console.warn('AuthService - Could not read localStorage for debugging', e);
            }
          } else {
            console.error('AuthService - Invalid login response format:', res);
            throw new Error('Formato de respuesta de inicio de sesión inválido');
          }
        },
        error: (error) => {
          console.error('AuthService - Login error:', error);
          this.clearSession();
          throw error;
        }
      })
    );
  }

  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    console.log('Logging out...');
    this.clearSession();
    // Force a full page reload to ensure all application state is cleared
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
