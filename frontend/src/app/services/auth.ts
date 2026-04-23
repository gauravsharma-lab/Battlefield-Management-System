import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ✅ LOGIN
  login(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ GET TOKEN
  getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('token');
  }

  // ✅ CHECK LOGIN (SIMPLE & STABLE)
isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

  // ✅ GET USER FROM TOKEN
  getUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // ✅ ADMIN CHECK
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}