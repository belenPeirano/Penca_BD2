import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IPartido } from '../../interfaces/IPartido';
import { ApiService } from '../../services/api.service';
import { IPrediccion } from '../../interfaces/IPrediccion';
import { MatIconModule } from '@angular/material/icon';
import { PartidoService } from '../../services/partido.service';

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.scss'
})
export class PrediccionComponent implements OnInit {

  prediccion!: IPrediccion;
  prediccionForm!: FormGroup;
  partido!: IPartido;
  partidoId!: number;
  ciUsuario: string = localStorage.getItem('ci') || '';

  constructor(private partidoServ: PartidoService, private api: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.partidoId = +id;
        this.getPartido(this.partidoId);
        this.getPrediccion();
      } else {
        console.error('ID de partido no encontrado');
      }
    });
    this.prediccionForm = this.fb.group({
      id_partido: new FormControl(this.partidoId),
      ci_estudiante: new FormControl(this.ciUsuario),
      equipo_ganador: new FormControl('', [Validators.required]),
      result_local: new FormControl('', [Validators.required]),
      result_visitante: new FormControl('', [Validators.required]),
      puntaje: new FormControl(0)
    });

    
  }

  getPrediccion(): void {
    this.partidoServ.getPrediccionPorPartido(this.ciUsuario, this.partidoId).subscribe(prediccion => {
      if (prediccion) {
        this.prediccion = prediccion;
        this.prediccionForm.patchValue({
          equipo_ganador: prediccion.equipo_ganador,
          result_local: prediccion.result_local,
          result_visitante: prediccion.result_visitante
        });
      }
    });
  }

  getPartido(id: number): void {
    this.partidoServ.getPartido(id).subscribe(partido => {
      this.partido = partido;
    });
  }

  guardarPrediccion(): void {
    this.partidoServ.guardarPrediccion(this.prediccionForm.value).subscribe(response => {
      console.log('Predicción guardada', response);
    });
    this.router.navigate(['/proxPartidos']);

  }


goBack(): void {
  window.history.back();
}
}
