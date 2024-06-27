import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api';
  http = inject(HttpClient);

  login(credentials: { email: string, psw: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/participante/login`, credentials);
  }

  register(participante: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/participante/register`, participante);
  }

}
