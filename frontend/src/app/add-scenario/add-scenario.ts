import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-scenario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-scenario.html',
  styleUrls: ['./add-scenario.css']
})
export class AddScenario implements OnInit {

  scenarioId: string | null = null;
  assets: any[] = [];
  
  scenario: any = {
    scenarioName: '',
    weather: 'clear',
    missionType: 'attack',
    terrainType: 'desert',
    friendlyAssets: [],
    enemyAssets: [],
    description: ''
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    this.scenarioId = this.route.snapshot.paramMap.get('id');

    if (this.scenarioId && this.scenarioId !== 'null') {
      this.loadScenario(this.scenarioId);
    }
  }

  loadAssets(): void {
    this.api.getAssets().subscribe({
      next: (res: any) => {
        this.assets = res || [];
      },
      error: (err) => console.error(err)
    });
  }

  loadScenario(id: string): void {
    // We need a getScenarioById in ApiService or use a filtered get
    this.api.getScenarios().subscribe({
      next: (res: any) => {
        const found = res.find((s: any) => s._id === id);
        if (found) {
          this.scenario = { ...found };
        }
      },
      error: (err) => console.error(err)
    });
  }

  addScenario(): void {
    // Clean internal fields
    const { _id, userId, createdAt, updatedAt, __v, ...cleanData } = this.scenario;

    if (this.scenarioId) {
      this.api.updateScenario(this.scenarioId, cleanData).subscribe({
        next: () => {
          alert('✅ Scenario Updated!');
          this.router.navigateByUrl('/scenarios');
        },
        error: (err) => {
          console.error(err);
          alert('❌ Update failed');
        }
      });
    } else {
      this.api.addScenario(cleanData).subscribe({
        next: () => {
          alert('✅ Scenario Created!');
          this.router.navigateByUrl('/scenarios');
        },
        error: (err) => {
          console.error(err);
          alert('❌ Create failed');
        }
      });
    }
  }
}