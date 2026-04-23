import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // 🔥 REFRESH SYSTEM (FIX)
  private refreshAssetsSubject = new Subject<void>();
  refreshAssets$ = this.refreshAssetsSubject.asObservable();

  triggerAssetRefresh() {
    this.refreshAssetsSubject.next();
  }

  // AUTH HEADERS
  private getAuthHeaders() {
    const token = localStorage.getItem('token');

      console.log("TOKEN SENT:", token); 

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  // ===== ASSETS =====
  addAsset(data: any) {
    return this.http.post(`${this.baseUrl}/assets`, data, this.getAuthHeaders());
  }

  getAssets() {
    return this.http.get(`${this.baseUrl}/assets`, this.getAuthHeaders());
  }

  updateAsset(id: string, data: any) {
  const token = localStorage.getItem('token');

  return this.http.put(
    `${this.baseUrl}/assets/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

  deleteAsset(id: string) {
    return this.http.delete(`${this.baseUrl}/assets/${id}`, this.getAuthHeaders());
  }

  // ===== SCENARIOS =====
  addScenario(data: any) {
    return this.http.post(`${this.baseUrl}/scenarios`, data, this.getAuthHeaders());
  }

  getScenarios() {
    return this.http.get(`${this.baseUrl}/scenarios`, this.getAuthHeaders());
  }

  updateScenario(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/scenarios/${id}`, data, this.getAuthHeaders());
  }

  deleteScenario(id: string) {
    return this.http.delete(`${this.baseUrl}/scenarios/${id}`, this.getAuthHeaders());
  }
}