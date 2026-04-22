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
  loading = false;   // 👈 ADD HERE

  constructor(private scenarioService: ScenarioService) {}

  ngOnInit() {
    this.loadScenarios();
  }

 loadScenarios() {
  this.loading = true;

  this.scenarioService.getScenarios().subscribe(data => {
    this.scenarios = data;
    this.loading = false;
  });
}

  delete(id: string) {
  const confirmDelete = confirm('Are you sure you want to delete this scenario?');

  if (confirmDelete) {
    this.scenarioService.deleteScenario(id).subscribe(() => {
      this.loadScenarios();
    });
  }
}
}