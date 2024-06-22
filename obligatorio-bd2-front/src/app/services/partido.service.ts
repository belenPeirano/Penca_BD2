import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPartido } from '../interfaces/IPartido';
import { IPrediccion } from '../interfaces/IPrediccion';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  baseUrl = 'http://localhost:3000';
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
    return this.getPredicciones(ci).pipe(
      map(predicciones => {
        const prediccionesPartido: IPrediccion[] = predicciones.filter(prediccion => prediccion.id_partido === partidoId);
        prediccionesPartido.sort((a, b) => b.id_prediccion - a.id_prediccion);
        return prediccionesPartido[0];
      })
    );
  }

  guardarPrediccion(prediccion: IPrediccion): Observable<IPrediccion> {
    return this.http.post<IPrediccion>(`${this.baseUrl}/participante/prediccion`, prediccion);
  }
}
