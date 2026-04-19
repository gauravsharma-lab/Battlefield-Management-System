import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl = 'http://localhost:5000/api/scenarios';

  constructor(private http: HttpClient) {}

  getScenarios() {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteScenario(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}