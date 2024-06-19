import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { IPartido } from '../../interfaces/IPartido';
import { ApiService } from '../../services/api.service';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-admin',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
     MatTabsModule, MatGridListModule, MatCardModule, CommonModule, MatDividerModule, MatButtonModule, RouterLink, RouterOutlet, MatFormField, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.scss'
})
export class PaginaAdminComponent implements OnInit{
  partidos: IPartido[] = [];
  partido: IPartido | undefined;
  partidoForm: FormGroup;

  equipos = ['Equipo A', 'Equipo B', 'Equipo C']; // Lista de equipos
  fases = ['Fase 1', 'Fase 2', 'Fase 3']; // Lista de fases

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) {
    this.partidoForm = this.fb.group({
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      equipoLocal: ['', Validators.required],
      equipoVisitante: ['', Validators.required],
      fase: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.api.getPartidosPasados().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
      }
    });
  }

  getPartido(id: number): void {
    this.api.getPartido(id).subscribe({
      next: (partido) => {
        this.partido = partido;
      },
      error: (error) => {
        console.error('Error al obtener el partido:', error);
      }
    });
  }

  submitPartido(): void {
    if (this.partidoForm.valid) {
      console.log('Nuevo partido:', this.partidoForm.value);
      // Aquí puedes procesar el formulario, por ejemplo, enviar los datos al servidor
      // Reiniciar el formulario después de enviar
      this.partidoForm.reset();
    }
  }

}
