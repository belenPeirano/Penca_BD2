import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IPartido } from '../../interfaces/IPartido';
import { ApiService } from '../../services/api.service';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartidoService } from '../../services/partido.service';
import { IEquipo } from '../../interfaces/iequipo';
import { IFase } from '../../interfaces/ifase';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  equipos: IEquipo[] = [];
  fases: IFase[] = [];

  constructor(private api: ApiService, private fb: FormBuilder, private partidoServ: PartidoService, private snackBar: MatSnackBar) {
    this.partidoForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugar: ['', Validators.required],
      equipoLocal: ['', Validators.required],
      equipoVisitante: ['', Validators.required],
      fase: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.partidoServ.partidosPasados().subscribe({
      next: (partidos) => {
        this.partidos = partidos;
      }
    });
    this.api.getEquipos().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
      }
    });
    this.api.getFases().subscribe({
      next: (fases) => {
        this.fases = fases;
      }
    });
  }

  guardarPartido(): void {
    if (this.partidoForm.valid) {
      const fecha = this.partidoForm.get('fecha')?.value;
      const hora = this.partidoForm.get('hora')?.value;
      const lugar = this.partidoForm.get('lugar')?.value;
      const equipoLocal = this.partidoForm.get('equipoLocal')?.value;
      const equipoVisitante = this.partidoForm.get('equipoVisitante')?.value;
      const fase = this.partidoForm.get('fase')?.value;

      const fechaHora = `${fecha} ${hora}:00`

      const partido = {
        fecha: fechaHora,
        lugar: lugar,
        fase: fase,
        equipo_local: equipoLocal,
        equipo_visitante: equipoVisitante
      };

      this.partidoServ.guardarPartido(partido).subscribe({
        next: (res) => {
          this.partidoServ.partidosPasados().subscribe({
            next: (partidos) => {
              this.partidos = partidos;
              this.snackBar.open('Partido guardado', 'Cerrar', {
                duration: 2000,
              });
            }
          });
        },
        error: (error) => {
          console.error('Error al guardar el partido:', error);
        }
      });
      this.partidoForm.reset();
    }
  }

}
