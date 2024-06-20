import { Component, OnInit } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      psw: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('x-token', res.token);
        this.router.navigate(['/proxPartidos']);
        // if (res.rol === "ESTUDIANTE") {
        //   this.router.navigate(['/proxPartidos']);
        // } else {
        //   this.router.navigate(['/admin']);
        // }
      },
      error: (err) => {
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 2000,
        });
        console.error(err);
      }
    });
  }
}
