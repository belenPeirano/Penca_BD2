import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule, RouterLink, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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

}
