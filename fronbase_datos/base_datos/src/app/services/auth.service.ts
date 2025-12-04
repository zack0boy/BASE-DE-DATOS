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
    return this.api.create('login', { rut, password }).pipe(
      tap({
        next: (res: any) => {
          console.log('Login response:', res);
          if (res && res.id_usuario) {
            // Store token and user data
            localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
            localStorage.setItem(this.USER_KEY, JSON.stringify({
              id: res.id_usuario,
              name: res.nombre,
              role: res.id_rol
            }));
            console.log('User logged in successfully');
          } else {
            throw new Error('Formato de respuesta de inicio de sesión inválido');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
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
