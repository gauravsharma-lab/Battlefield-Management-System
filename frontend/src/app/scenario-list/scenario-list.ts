import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './scenario-list.html',
  styleUrls: ['./scenario-list.css'],
})
export class ScenarioList implements OnInit {

  scenarios: any[] = [];

  // Search & Filter State
  searchTerm: string = '';
  selectedWeather: string = '';
  selectedMission: string = '';

  weathers = ['Clear', 'Fog', 'Rain', 'Storm'];
  missions = ['Interception', 'Patrol', 'Escort', 'Strike'];

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadScenarios();
  }

  loadScenarios() {
    this.api.getScenarios().subscribe({
      next: (res: any) => {
        this.scenarios = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("FETCH ERROR:", err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  // ✅ Computed: Filtered Scenarios
  get filteredScenarios() {
    return this.scenarios.filter(s => {
      const matchSearch = s.scenarioName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchWeather = !this.selectedWeather || s.weather.toLowerCase() === this.selectedWeather.toLowerCase();
      const matchMission = !this.selectedMission || s.missionType.toLowerCase() === this.selectedMission.toLowerCase();
      return matchSearch && matchWeather && matchMission;
    });
  }

  editScenario(id: string) {
    this.router.navigate(['/add-scenario', id]);
  }

  delete(id: string) {
    if (!confirm('Are you sure?')) return;
    this.api.deleteScenario(id).subscribe({
      next: () => this.loadScenarios(),
      error: (err) => console.error(err)
    });
  }
}