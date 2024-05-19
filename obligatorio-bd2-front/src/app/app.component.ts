import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackService } from './services/back.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from './interfaces/iUsuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  backService = inject(BackService);

  usuarios: IUsuario[] = [];

  constructor() {
    this.backService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
