import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // ASSETS
  getAssets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/assets`);
  }

  addAsset(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/assets`, data);
  }

  deleteAsset(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/assets/${id}`);
  }

  // SCENARIOS
  getScenarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/scenarios`);
  }

  addScenario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/scenarios`, data);
  }

  deleteScenario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/scenarios/${id}`);
  }
}