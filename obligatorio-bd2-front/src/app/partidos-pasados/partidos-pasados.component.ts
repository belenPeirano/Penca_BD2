import { Component } from '@angular/core';
import { IPartido } from '../interfaces/IPartido';
import { CommonModule, DatePipe } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { IPrediccion } from '../interfaces/IPrediccion';
import { PartidoService } from '../services/partido.service';

@Component({
  selector: 'app-partidos-pasados',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './partidos-pasados.component.html',
  styleUrl: './partidos-pasados.component.scss',
  providers: [DatePipe]
})
export class PartidosPasadosComponent {

  partidosPasados: IPartido[] = [];
  prediccion: IPrediccion | undefined;
  predicciones: IPrediccion[] = [];
  usuarioCi: string = localStorage.getItem('ci') ?? '';

  constructor(private partidoServ: PartidoService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.partidoServ.partidosPasados().subscribe({
      next: (partidosPasados) => {
        this.partidosPasados = partidosPasados;
      }
    });
    this.partidoServ.getPredicciones(this.usuarioCi).subscribe({
      next: (predicciones) => {
        this.predicciones = predicciones;
      }
    });
  }

  getPrediccion(partidoId: number): IPrediccion | undefined{
    const prediccionesPartido: IPrediccion[] = this.predicciones.filter(prediccion => prediccion.id_partido === partidoId);
    prediccionesPartido.sort((a, b) => b.id_prediccion - a.id_prediccion);
    return prediccionesPartido[0];
  }

}
