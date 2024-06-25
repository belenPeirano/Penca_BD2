import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatFormField, MatLabel, MatError, ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  perfilForm!: FormGroup;
  usuarioCi: string = localStorage.getItem('ci') ?? '';

  constructor(private fb: FormBuilder, private api: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      ci: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      carrera: [{ value: '', disabled: true }],
      puntaje_total: [{ value: '', disabled: true }],
      predic_campeon: [{ value: '', disabled: true }],
      predic_subcampeon: [{ value: '', disabled: true }]
    });

    this.getPerfil();
  }

  getPerfil(): void {
    this.api.getEstudiante(this.usuarioCi).subscribe(usuario => {
      if (usuario) {
        this.perfilForm.patchValue({
          ci: usuario.ci,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          carrera: usuario.carrera,
          puntaje_total: usuario.puntaje_total,
          predic_campeon: usuario.campeon,
          predic_subcampeon: usuario.subcampeon
        });
      }
    });
  }

  guardarPerfil(): void {
    this.api.actualizarPerfil(this.perfilForm.getRawValue()).subscribe(res => {
      this.snackBar.open(res.message, 'Cerrar', { duration: 2000 });
    });
  }

}
