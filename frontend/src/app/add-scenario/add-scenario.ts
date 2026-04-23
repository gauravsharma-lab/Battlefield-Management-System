import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-scenario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-scenario.html',
  styleUrls: ['./add-scenario.css']
})
export class AddScenario implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  scenarioId: string | null = null;

  scenario: any = {
    scenarioName: '',
    weather: 'clear',
    missionType: '',
    terrainType: '',
    friendlyAssets: [],
    enemyAssets: []
  };

  assets: any[] = [];

  // 🔥 TOKEN HELPER (IMPORTANT)
  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  ngOnInit(): void {
    this.loadAssets();

    this.scenarioId = this.route.snapshot.paramMap.get('id');

    if (this.scenarioId) {
      this.loadScenario(this.scenarioId);
    }
  }

  // ✅ FIXED
  loadAssets(): void {
    this.http.get<any[]>(
      'http://localhost:5000/api/assets',
      this.getAuthHeaders()
    ).subscribe({
      next: (res) => {
        this.assets = Array.isArray(res) ? res : [];
      },
      error: (err) => {
        console.error(err);
        this.assets = [];
      }
    });
  }

  loadScenario(id: string): void {
    this.http.get<any>(
      `http://localhost:5000/api/scenarios/${id}`,
      this.getAuthHeaders()
    ).subscribe({
      next: (res) => {
        this.scenario = res;
      },
      error: (err) => console.error(err)
    });
  }

  addScenario(): void {

    if (this.scenarioId) {
      this.http.put(
        `http://localhost:5000/api/scenarios/${this.scenarioId}`,
        this.scenario,
        this.getAuthHeaders()
      ).subscribe({
        next: () => {
          alert('✅ Scenario Updated!');
          this.router.navigate(['/scenarios']);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Update failed');
        }
      });

    } else {
      this.http.post(
        'http://localhost:5000/api/scenarios',
        this.scenario,
        this.getAuthHeaders()
      ).subscribe({
        next: () => {
          alert('✅ Scenario Created!');
          this.router.navigate(['/scenarios'], { state: { refresh: true } });
        },
        error: (err) => {
          console.error(err);
          alert('❌ Create failed');
        }
      });
    }
  }
}