import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IEstudiante } from '../interfaces/IEstudiante';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ICarrera } from '../interfaces/icarrera';
import { IEquipo } from '../interfaces/iequipo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  constructor() { }

  getEstudiantes(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(`${this.baseUrl}/participante`);
  }

  getEstudiante(ci: string): Observable<IEstudiante> {
    return this.getEstudiantes().pipe(
      map(estudiantes => estudiantes.find(estudiante => estudiante.ci === ci)!)
    );
  }

  getPuntos(ci: string): Observable<{ total_puntos: string }> {
    const params = new HttpParams().set('ci', ci);
    return this.http.get<{ total_puntos: string }>(`${this.baseUrl}/participante/points`, { params });
  }

  getCarreras(): Observable<ICarrera[]> {
    return this.http.get<ICarrera[]>(`${this.baseUrl}/carrera`);
  }

  getEquipos(): Observable<IEquipo[]> {
    return this.http.get<IEquipo[]>(`${this.baseUrl}/partido/equipos`);
  }

  actualizarPerfil(estudiante: any): Observable<{ message: string }> {
    console.log('Actualizando perfil', estudiante);
    return this.http.put<{ message: string }>(`${this.baseUrl}/participante/actualizar`, estudiante);
  }

}
