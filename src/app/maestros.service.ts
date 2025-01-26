import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  private apiUrl = 'http://127.0.0.1:8000/lista-maestros/'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
