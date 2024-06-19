import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IPartido } from '../interfaces/IPartido';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prox-partidos',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatDividerModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './prox-partidos.component.html',
  styleUrl: './prox-partidos.component.scss'
})
export class ProxPartidosComponent {

  partidos: IPartido[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getPartidosPasados().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
      }
    });
  }

  navigateToPrediccion(partidoId: number) {
    console.log('Partido ID:', partidoId);
    this.router.navigate(['/prediccion', partidoId]);
  }
}
