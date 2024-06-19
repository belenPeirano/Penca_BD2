import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEstudiante } from '../interfaces/IEstudiante';
import { IPartido } from '../interfaces/IPartido';
import { IPrediccion } from '../interfaces/IPrediccion';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  partidos: IPartido[] = [
    {id: 1, local: 'Nacional', visitante: 'Peñarol', fecha: '2021-05-20 20:00', fase: 'GRUPOS', lugar: 'Estadio Centenario', resultado_local: 2, resultado_visitante: 1 },
    { id: 2, local: 'Liverpool', visitante: 'Fénix', fecha: '2021-05-21 19:00', fase: 'GRUPOS', lugar: 'Estadio Campeón del Siglo', resultado_local: 3, resultado_visitante: 2 },
    { id: 3, local: 'Cerro', visitante: 'Defensor', fecha: '2021-05-22 15:00', fase: 'GRUPOS', lugar: 'Estadio Luis Tróccoli', resultado_local: 1, resultado_visitante: 1 },
    { id: 4, local: 'Wanderers', visitante: 'Plaza', fecha: '2021-05-23 17:00', fase: 'GRUPOS', lugar: 'Estadio Alfredo Victor Viera', resultado_local: 1, resultado_visitante: 2 },
    { id: 5, local: 'River', visitante: 'Racing', fecha: '2021-05-24 21:00', fase: 'CUARTOS', lugar: 'Estadio Saroldi', resultado_local: 0, resultado_visitante: 3 },
    { id: 6, local: 'Danubio', visitante: 'Rampla', fecha: '2021-05-25 19:00', fase: 'CUARTOS', lugar: 'Estadio Jardines del Hipódromo', resultado_local: 2, resultado_visitante: 2 },
    { id: 7, local: 'Boston River', visitante: 'Cerro Largo', fecha: '2021-05-26 20:00', fase: 'CUARTOS', lugar: 'Estadio Parque Artigas', resultado_local: 1, resultado_visitante: 0 },
    { id: 8, local: 'Progreso', visitante: 'Cerro', fecha: '2021-05-27 21:00', fase: 'SEMIFINAL', lugar: 'Estadio Abraham Paladino', resultado_local: 2, resultado_visitante: 1 }
  ];

  constructor() { }

  getEstudiantes(): Observable<IEstudiante[]> {
    return of([
      {posicion: 1, nombre: 'Maria Gomez', puntos: 100},
      {posicion: 2, nombre: 'Juan Perez', puntos: 90},
      {posicion: 3, nombre: 'Luciana Alonso', puntos: 80},
      {posicion: 4, nombre: 'Pierina Lugarte', puntos: 70},
      {posicion: 5, nombre: 'Federico Gutierrez', puntos: 60},
      {posicion: 6, nombre: 'Cumsi', puntos: 0}
    ]);
  }

  getPartido(id: number): Observable<IPartido | undefined> {
    const partido = this.partidos.find(p => p.id === id);
    return of(partido);
  }

  getPrediccion(partidoId: number, usuarioId: number): Observable<IPrediccion | undefined> {
    return of({id: 1, partido: partidoId, prediccionLocal: 2, prediccionVisitante: 1, usuarioId: usuarioId, puntaje: 10, equipoGanador: 'Nacional'});
  }

  getPartidosPasados(): Observable<IPartido[]> {
    return of(this.partidos) 
  }

  getPredicciones(): Observable<IPrediccion[]> {
    return of([
      {id: 1, partido: 1, prediccionLocal: 2, prediccionVisitante: 1, usuarioId: 1, puntaje: 10, equipoGanador: '1'},
      {id: 2, partido: 2, prediccionLocal: 3, prediccionVisitante: 2, usuarioId: 1, puntaje: 10, equipoGanador: '1'},
      {id: 3, partido: 3, prediccionLocal: 1, prediccionVisitante: 1, usuarioId: 1, puntaje: 5, equipoGanador: '0'},
      {id: 4, partido: 8, prediccionLocal: 1, prediccionVisitante: 2, usuarioId: 1, puntaje: 0, equipoGanador: '2'},
      {id: 5, partido: 5, prediccionLocal: 0, prediccionVisitante: 3, usuarioId: 1, puntaje: 0, equipoGanador: '2'},
      {id: 6, partido: 6, prediccionLocal: 2, prediccionVisitante: 2, usuarioId: 1, puntaje: 5, equipoGanador: '0'},
      {id: 7, partido: 7, prediccionLocal: 1, prediccionVisitante: 0, usuarioId: 1, puntaje: 10, equipoGanador: '1'}
    ]);
  }

  getUsuario(id: number): Observable<Iusuario | undefined> {
    return of({ci: '12345678', nombre: 'Juan', apellido: 'Perez', email: 'jperez@gmail.com', carrera: 'Ingeniería', puntaje_total: 100, predic_campeon: 'Nacional', predic_subcampeon: 'Peñarol'});
  }
}
