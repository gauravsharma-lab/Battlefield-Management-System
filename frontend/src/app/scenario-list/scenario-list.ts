import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenario-list.html',
  styleUrls: ['./scenario-list.css'],
})
export class ScenarioList implements OnInit {

  scenarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  this.loadScenarios();
}

loadScenarios() {
  this.http.get<any[]>('http://localhost:5000/api/scenarios')
    .subscribe({
      next: (res) => {
        console.log("🔥 API DATA:", res);

        this.scenarios = res; // 👈 keep it simple

        console.log("FINAL LENGTH:", this.scenarios.length);
      },
      error: (err) => {
        console.error("❌ API ERROR:", err);
        this.scenarios = []; // fallback
      }
    });
}
  // ✏️ EDIT (navigate to Add/Edit page)
  editScenario(id: string) {
    this.router.navigate(['/add-scenario', id]);
  }

  // 🗑️ DELETE with token[]
  delete(id: string) {
    if (!confirm('Are you sure?')) return;

    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.delete(
      `http://localhost:5000/api/scenarios/${id}`,
      { headers }
    ).subscribe({
      next: () => {
        alert('🗑️ Deleted');
        this.loadScenarios();
      },
      error: (err) => console.error(err)
    });
  }
}