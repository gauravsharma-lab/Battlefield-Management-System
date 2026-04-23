import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:5000/api/auth/login', data)
      .subscribe({
        next: (res) => {
          this.auth.login(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Invalid credentials');
        }
      });
  }
}