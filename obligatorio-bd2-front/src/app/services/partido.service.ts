import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPartido } from '../interfaces/IPartido';
import { IPrediccion } from '../interfaces/IPrediccion';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  baseUrl = 'http://localhost:3000/api';
  http = inject(HttpClient);

  constructor() { }

  getPartidos(): Observable<IPartido[]> {
    return this.http.get<IPartido[]>(`${this.baseUrl}/partido`);
  }

  partidosPasados(): Observable<IPartido[]> {
    return this.getPartidos().pipe(
      map(partidos => partidos.filter(partido => new Date(partido.fecha) < new Date()))
    );
  }

  partidosProximos(): Observable<IPartido[]> {
    return this.getPartidos().pipe(
      map(partidos => partidos.filter(partido => new Date(partido.fecha) > new Date()))
    );
  }

  getPartido(id: number): Observable<IPartido> {
    return this.getPartidos().pipe(
      map(partidos => partidos.find(partido => partido.id_partido === id)!)
    );
  }

  getPredicciones(ci: string): Observable<IPrediccion[]> {
    return this.http.get<IPrediccion[]>(`${this.baseUrl}/participante/predicciones/${ci}`);
  }

  getPrediccionPorPartido(ci: string, partidoId: number): Observable<IPrediccion> {
    return this.http.get<IPrediccion>(`${this.baseUrl}/participante/${ci}/prediccion/${partidoId}`);
  }

  guardarPrediccion(prediccion: IPrediccion): Observable<IPrediccion> {
    return this.http.post<IPrediccion>(`${this.baseUrl}/participante/prediccion`, prediccion);
  }

  actualizarPrediccion(prediccion: IPrediccion): Observable<IPrediccion> {
    return this.http.put<IPrediccion>(`${this.baseUrl}/participante/prediccion`, prediccion);
  }

  guardarPartido(partido: any): Observable<IPartido> {
    return this.http.post<IPartido>(`${this.baseUrl}/partido`, partido);
  }

  guardarResultado(partidoId: number, resultadoLocal: number, resultadoVisitante: number): Observable<IPartido> {
    return this.http.put<IPartido>(`${this.baseUrl}/partido`, { id_partido: partidoId, result_local: resultadoLocal, result_visitante: resultadoVisitante });
  }
}
