import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Verifica si el token está presente
    if (token) {
      return true; // Permite el acceso si hay token
    } else {
      this.router.navigate(['/']); // Redirige al login si no hay token
      alert('Por favor, inicie sesión para acceder a esta página.');
      return false;
    }
  }
}
