import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUsuario } from '../interfaces/iUsuario';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  backUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  constructor() { }

  getUsuarios() {
    return this.http.get<IUsuario[]>(`${this.backUrl}/usuarios`);
  }
}
