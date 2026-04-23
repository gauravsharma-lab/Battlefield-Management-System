import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.css'
})
export class AssetList implements OnInit {

  assets: any[] = [];

  // Search & Filter State
  searchTerm: string = '';
  selectedType: string = '';
  selectedTeam: string = '';

  // Asset Types for filter dropdown
  assetTypes = ['fighter', 'bomber', 'radar', 'sam', 'airbase', 'enemy_aircraft'];

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.api.getAssets().subscribe({
      next: (res: any) => {
        this.assets = res || [];
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
  }

  deleteAsset(id: string) {
    if (!confirm('Are you sure?')) return;
    this.api.deleteAsset(id).subscribe({
      next: () => this.loadAssets(),
      error: (err) => console.error(err)
    });
  }

  editAsset(id: string) {
    this.router.navigate(['/add-asset', id]);
  }

  // ✅ Computed: Filtered Assets
  get filteredAssets() {
    return this.assets.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = !this.selectedType || a.type === this.selectedType;
      const matchTeam = !this.selectedTeam || a.team === this.selectedTeam;
      return matchSearch && matchType && matchTeam;
    });
  }

  // ✅ Computed: Grouped Assets
  get friendlyAssets() {
    return this.filteredAssets.filter(a => a.team === 'friendly');
  }

  get enemyAssets() {
    return this.filteredAssets.filter(a => a.team === 'enemy');
  }
}