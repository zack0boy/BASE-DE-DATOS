import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard - Checking authentication status...');
  const isAuthenticated = authService.isLoggedIn();
  console.log('AuthGuard - isAuthenticated:', isAuthenticated);
  
  if (isAuthenticated) {
    console.log('AuthGuard - Access granted');
    return true;
  }

  console.log('AuthGuard - Access denied, redirecting to login');
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  }).then(() => {
    console.log('AuthGuard - Navigation to login completed');
  }).catch(err => {
    console.error('AuthGuard - Navigation error:', err);
    window.location.href = '/login';
  });
  
  return false;
};
