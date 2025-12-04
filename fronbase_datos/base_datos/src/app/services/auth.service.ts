import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private tokenExpKey = 'token_exp';
  constructor(private api: ApiService) {}

  login(rut: string, password: string): Observable<any> {
    // Llamamos al endpoint 'auth/login' (ajusta si tu backend usa otro)
    return this.api.create('login', { rut, password }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          const expiresIn = res.expires_in || 3600; // segundos por defecto
          const exp = Date.now() + expiresIn * 1000;
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.tokenExpKey, exp.toString());
        }
        if (res && res.user) {
          localStorage.setItem('usuario', JSON.stringify(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpKey);
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    const exp = localStorage.getItem(this.tokenExpKey);
    if (!token || !exp) return null;
    if (Date.now() > Number(exp)) {
      this.logout();
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
