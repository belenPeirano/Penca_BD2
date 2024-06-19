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
    {id_partido: 1, equipo_local: 'Uruguay', equipo_visitante: 'Argentina', fecha: '2021-05-20 20:00', fase: 'GRUPOS', lugar: 'Estadio Centenario', result_local: 2, result_visitante: 1 },
    { id_partido: 2, equipo_local: 'Brasil', equipo_visitante: 'USA', fecha: '2021-05-21 19:00', fase: 'GRUPOS', lugar: 'Estadio Campeón del Siglo', result_local: 3, result_visitante: 2 },
    { id_partido: 3, equipo_local: 'Argentina', equipo_visitante: 'Peru', fecha: '2021-05-22 15:00', fase: 'GRUPOS', lugar: 'Estadio Luis Tróccoli', result_local: 1, result_visitante: 1 },
    { id_partido: 4, equipo_local: 'Uruguay', equipo_visitante: 'Brasil', fecha: '2021-05-23 17:00', fase: 'GRUPOS', lugar: 'Estadio Alfredo Victor Viera', result_local: 1, result_visitante: 2 },
    { id_partido: 5, equipo_local: 'Chile', equipo_visitante: 'USA', fecha: '2021-05-24 21:00', fase: 'CUARTOS', lugar: 'Estadio Saroldi', result_local: 0, result_visitante: 3 },
    { id_partido: 6, equipo_local: 'Argentina', equipo_visitante: 'Chile', fecha: '2021-05-25 19:00', fase: 'CUARTOS', lugar: 'Estadio Jardines del Hipódromo', result_local: 2, result_visitante: 2 },
    { id_partido: 7, equipo_local: 'Peru', equipo_visitante: 'Uruguay', fecha: '2021-05-26 20:00', fase: 'CUARTOS', lugar: 'Estadio Parque Artigas', result_local: 1, result_visitante: 0 },
    { id_partido: 8, equipo_local: 'USA', equipo_visitante: 'Brasil', fecha: '2021-05-27 21:00', fase: 'SEMIFINAL', lugar: 'Estadio Abraham Paladino', result_local: 2, result_visitante: 1 }
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
    const partido = this.partidos.find(p => p.id_partido === id);
    return of(partido);
  }

  getPrediccion(partidoId: number, usuarioId: number): Observable<IPrediccion | undefined> {
    return of({id_prediccion: 1, id_partido: partidoId, result_local: 2, result_visitante: 1, ci_estudiante: usuarioId, puntaje: 10, equipo_ganador: 'Nacional'});
  }

  getPartidosPasados(): Observable<IPartido[]> {
    return of(this.partidos) 
  }

  getPredicciones(): Observable<IPrediccion[]> {
    return of([
      {id_prediccion: 1, id_partido: 1, result_local: 2, result_visitante: 1, ci_estudiante: 1, puntaje: 10, equipo_ganador: '1'},
      {id_prediccion: 2, id_partido: 2, result_local: 3, result_visitante: 2, ci_estudiante: 1, puntaje: 10, equipo_ganador: '1'},
      {id_prediccion: 3, id_partido: 3, result_local: 1, result_visitante: 1, ci_estudiante: 1, puntaje: 5, equipo_ganador: '0'},
      {id_prediccion: 4, id_partido: 8, result_local: 1, result_visitante: 2, ci_estudiante: 1, puntaje: 0, equipo_ganador: '2'},
      {id_prediccion: 5, id_partido: 5, result_local: 0, result_visitante: 3, ci_estudiante: 1, puntaje: 0, equipo_ganador: '2'},
      {id_prediccion: 6, id_partido: 6, result_local: 2, result_visitante: 2, ci_estudiante: 1, puntaje: 5, equipo_ganador: '0'},
      {id_prediccion: 7, id_partido: 7, result_local: 1, result_visitante: 0, ci_estudiante: 1, puntaje: 10, equipo_ganador: '1'}
    ])
  }

  getUsuario(id: number): Observable<Iusuario | undefined> {
    return of({ci: '12345678', nombre: 'Juan', apellido: 'Perez', email: 'jperez@gmail.com', carrera: 'Ingeniería', puntaje_total: 100, predic_campeon: 'Nacional', predic_subcampeon: 'Peñarol'});
  }
}
