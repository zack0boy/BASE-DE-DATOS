import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-componet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-componet.html',
  styleUrls: ['./login-componet.css']
})
export class LoginComponet implements OnInit {
  rut = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.error = '';
    console.log('Login attempt with RUT:', this.rut);

    this.authService.login(this.rut, this.password).subscribe({
      next: (response) => {
        console.log('Login successful, response:', response);
        console.log('Is user logged in after login?', this.authService.isLoggedIn());
        console.log('Auth token:', localStorage.getItem('auth_token'));

        this.redirectByRole().then(success => {
          console.log('Navigation success:', success);
          if (!success) {
            console.error('Navigation failed, current URL:', window.location.href);
            window.location.href = '/estudiantes-inicio';
          }
        }).catch(err => {
          console.error('Navigation error:', err);
          window.location.href = '/estudiantes-inicio';
        });
      },
      error: (error) => {
        console.error('Login error:', error);
        const errorMessage = error.error?.message || error.message || 'Error desconocido';
        console.error('Error details:', errorMessage);
        this.error = error.error?.message || 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.isLoading = false;
      },
      complete: () => {
        console.log('Login process completed');
        this.isLoading = false;
      }
    });
  }

  private redirectByRole() {
    const currentUser = this.authService.getCurrentUser();
    const userRole = currentUser?.role || null;
    const isDocente = userRole === 42;
    const isAdmin = userRole === 1;

    if (isDocente || isAdmin) {
      return this.router.navigate(['/docente-inicio']);
    } else {
      return this.router.navigate(['/estudiantes-inicio']);
    }
  }
}
