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
import { MatIcon } from '@angular/material/icon';
import { PartidoService } from '../../services/partido.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ingresar-result',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './ingresar-result.component.html',
  styleUrl: './ingresar-result.component.scss'
})
export class IngresarResultComponent {

  partido: IPartido | undefined;
  resultadoForm!: FormGroup;
  partidoId!: number;

  constructor(private partidoServ: PartidoService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resultadoForm = this.fb.group({
      resultadoLocal: new FormControl('', [Validators.required, Validators.min(0)]),
      resultadoVisitante: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.partidoId = +id;
        this.getPartido(this.partidoId);
      } else {
        console.error('ID de partido no encontrado');
      }
    });
  }

  getPartido(id: number): void {
    this.partidoServ.getPartido(id).subscribe({
      next: (partido) => {
        this.partido = partido;
      },
      error: (error) => {
        console.error('Error al obtener el partido:', error);
      }
    });
  }

  guardarResultado(): void {
    if (this.resultadoForm.valid) {
      const resuladoLocal = this.resultadoForm.get('resultadoLocal')?.value;
      const resultadoVisitante = this.resultadoForm.get('resultadoVisitante')?.value;
      this.partidoServ.guardarResultado(this.partidoId, resuladoLocal, resultadoVisitante).subscribe(response => {
        this.snackBar.open('Resultado guardado', 'Cerrar', {
          duration: 2000,
        });
        console.log('Predicción guardada', response);
      });
      this.router.navigate(['/admin']);
      console.log('Formulario válido');
    } else {
      console.error('Formulario inválido');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
