import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  name = '';
  email = '';
  password = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/auth/signup', data)
      .subscribe({
        next: () => {
          alert('Signup successful');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Signup failed');
        }
      });
  }
}