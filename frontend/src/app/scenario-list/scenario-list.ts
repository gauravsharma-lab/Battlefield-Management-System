import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioService } from '../services/scenario';

@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenario-list.html'
})
export class ScenarioList implements OnInit {

  scenarios: any[] = [];

  constructor(private scenarioService: ScenarioService) {}

  ngOnInit() {
    this.loadScenarios();
  }

  loadScenarios() {
    this.scenarioService.getScenarios().subscribe(data => {
      this.scenarios = data;
    });
  }

  delete(id: string) {
    this.scenarioService.deleteScenario(id).subscribe(() => {
      this.loadScenarios();
    });
  }
}