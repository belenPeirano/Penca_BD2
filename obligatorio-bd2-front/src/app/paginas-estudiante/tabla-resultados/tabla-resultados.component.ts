import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { IEstudiante } from '../../interfaces/IEstudiante';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tabla-resultados',
  standalone: true,
  imports: [MatTableModule, MatCardModule, HttpClientModule],
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.scss'
})
export class TablaResultadosComponent implements OnInit {

  estudiantes: IEstudiante[] = [];
  puntosUsuario: string = "";
  ciUsuario: string = localStorage.getItem('ci') ?? '';
  posicionUsuario: number = 0;
  nombreUsuario: string = "";
  apellidoUsuario: string = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getEstudiantes().subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes;
        this.posicionUsuario = this.estudiantes.find(estudiante => estudiante.ci === this.ciUsuario)?.posicion || 0;
        this.nombreUsuario = this.estudiantes.find(estudiante => estudiante.ci === this.ciUsuario)?.nombre || '';
        this.apellidoUsuario = this.estudiantes.find(estudiante => estudiante.ci === this.ciUsuario)?.apellido || '';
      }
    });
    if (this.ciUsuario !== '') {
      this.api.getPuntos(this.ciUsuario).subscribe({
        next: (puntos) => {
          console.log(puntos);
          console.log(puntos.total_puntos);
          this.puntosUsuario = puntos.total_puntos;
        }
      });
    } else {
      console.error('No se encontró el CI del usuario');
    }
  }


  displayedColumns: string[] = ['posicion', 'nombre', 'puntos'];

}
