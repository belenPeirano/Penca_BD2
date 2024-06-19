import { Component } from '@angular/core';
import { IPartido } from '../interfaces/IPartido';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { IPrediccion } from '../interfaces/IPrediccion';

@Component({
  selector: 'app-partidos-pasados',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './partidos-pasados.component.html',
  styleUrl: './partidos-pasados.component.scss'
})
export class PartidosPasadosComponent {

  partidosPasados: IPartido[] = [];
  predicciones: IPrediccion[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPartidosPasados().subscribe({
      next: (partidosPasados) => {
        this.partidosPasados = partidosPasados;
      }
    });
    this.api.getPredicciones().subscribe({
      next: (predicciones) => {
        this.predicciones = predicciones;
      }
    });
  }

  //hay que cambiar esto a getPrediccionPorUsuario y no chequear acá el usuarioId

  getPrediccion(partidoId: number): IPrediccion | undefined{
    return this.predicciones.find(p => p.partido === partidoId && p.usuarioId === 1);

  }

}
