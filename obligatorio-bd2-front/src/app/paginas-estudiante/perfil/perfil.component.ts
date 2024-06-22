import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatFormField, MatLabel, MatError, ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  perfilForm!: FormGroup;
  usuarioCi: string = localStorage.getItem('ci') || '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

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

  submitPerfil(): void {
    if (this.perfilForm.valid) {
      const formValue = this.perfilForm.getRawValue(); // getRawValue para obtener valores incluso de los campos deshabilitados
      // this.api.updatePerfil(this.userId, formValue).subscribe(response => {
      //   console.log('Perfil actualizado', response);
      //   this.router.navigate(['/dashboard']);
      // });
      console.log('Perfil actualizado', formValue);
    } else {
      console.error('Formulario inválido');
    }
  }

}
