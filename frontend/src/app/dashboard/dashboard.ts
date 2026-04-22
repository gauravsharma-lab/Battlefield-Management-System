import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // ✅ needed for routerLink

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],  // ✅ IMPORTANT
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private router: Router) {}

  goToAssets() {
    this.router.navigate(['/assets']);
  }

}