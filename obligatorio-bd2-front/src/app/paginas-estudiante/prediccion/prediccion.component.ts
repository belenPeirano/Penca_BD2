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

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.scss'
})
export class PrediccionComponent implements OnInit {

  prediccion!: IPrediccion;
  prediccionForm!: FormGroup;
  partido: IPartido | undefined;
  partidoId!: number;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.prediccionForm = this.fb.group({
      equipoGanador: new FormControl('', [Validators.required]),
      prediccionLocal: new FormControl('', [Validators.required]),
      prediccionVisitante: new FormControl('', [Validators.required])
    });

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
  }

  getPrediccion(): void {
    this.api.getPrediccion(this.partidoId, 1).subscribe(prediccion => {
      if (prediccion) {
        this.prediccion = prediccion;
        this.prediccionForm.patchValue({
          equipoGanador: prediccion.equipoGanador,
          prediccionLocal: prediccion.prediccionLocal,
          prediccionVisitante: prediccion.prediccionVisitante
        });
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

  submitPrediccion(): void {
    if (this.prediccionForm.valid) {
      const formValue = this.prediccionForm.value;
      // this.api.setPrediccion(this.partidoId, formValue).subscribe(response => {
      //   console.log('Predicción guardada', response);
      // });
      this.router.navigate(['/proxPartidos']);
    } else {
      console.error('Formulario inválido');
    }
  }
}
