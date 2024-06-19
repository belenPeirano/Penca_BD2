import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { IEstudiante } from '../../interfaces/IEstudiante';

@Component({
  selector: 'app-tabla-resultados',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.scss'
})
export class TablaResultadosComponent implements OnInit {
  
  estudiantes: IEstudiante[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEstudiantes().subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes;
      }
    }
    );
  }


  displayedColumns: string[] = ['posicion', 'nombre', 'puntos'];

}
