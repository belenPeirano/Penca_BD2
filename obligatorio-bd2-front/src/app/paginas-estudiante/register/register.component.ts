import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { chequeoContraseñas } from '../../helpers/validador';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule, RouterLink, MatSelectModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  carreras = [
    'Ingeniería Civil',
    'Ingeniería Informática',
    'Medicina',
    'Derecho',
    'Psicología',
    'Administración de Empresas',
    'Arquitectura',
    'Biología',
    'Contabilidad',
    'Comunicación Social',
    'Diseño Gráfico',
    'Economía',
    'Educación',
    'Historia',
    'Marketing',
    'Nutrición',
    'Odontología',
    'Química',
    'Veterinaria',
    'Turismo',
    'Filosofía',
    'Geografía',
    'Matemáticas',
    'Física',
    'Arte y Diseño',
    'Antropología',
    'Sociología',
    'Ciencias Políticas',
    'Relaciones Internacionales'
  ];

  paises = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Paraguay',
    'Perú',
    'Uruguay',
    'Venezuela'
  ];
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      ci: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      psw: new FormControl('', [Validators.required]),
      confirmPsw: new FormControl('', [Validators.required]),
      id_carrera: new FormControl('', [Validators.required]),
      predic_campeon: new FormControl('', [Validators.required]),
      predic_subcampeon: new FormControl('', [Validators.required])
    }, { validators: chequeoContraseñas('psw', 'confirmPsw') }
    );

  }

  register(): void {
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.snackBar.open('Usuario registrado', 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
