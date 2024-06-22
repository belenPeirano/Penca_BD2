import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IPartido } from '../interfaces/IPartido';
import { Router } from '@angular/router';
import { PartidoService } from '../services/partido.service';

@Component({
  selector: 'app-prox-partidos',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatDividerModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './prox-partidos.component.html',
  styleUrl: './prox-partidos.component.scss',
  providers: [DatePipe]
})
export class ProxPartidosComponent {

  partidos: IPartido[] = [];

  constructor(private router: Router, private partido: PartidoService) { }

  ngOnInit(): void {
    this.partido.partidosProximos().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
      }
    });
  }

  abrirPrediccion(partidoId: number): void {
    this.router.navigate(['/prediccion', partidoId]);
  }
}
