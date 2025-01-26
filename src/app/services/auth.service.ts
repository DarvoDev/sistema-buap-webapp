import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulación del rol del usuario
  private userRole: string = 'Admin'; // Cambia este valor según el rol del usuario

  constructor() {}

  // Método para obtener el rol del usuario
  getUserRole(): string {
    return this.userRole;
  }

  // Método opcional para cambiar el rol (útil para pruebas)
  setUserRole(role: string): void {
    this.userRole = role;
  }
}
