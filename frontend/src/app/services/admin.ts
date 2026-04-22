import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:5000/api/auth/users');
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:5000/api/auth/users/${id}`);
  }
}