import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-asset.html',
  styleUrl: './add-asset.css'
})
export class AddAsset implements OnInit {

  assetId: string | null = null;
  
  asset: any = {
    name: '',
    type: 'fighter',
    team: 'friendly',
    latitude: 0,
    longitude: 0,
    speed: 0,
    fuel: 100,
    status: 'active'
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get('id');
    if (this.assetId && this.assetId !== 'null') {
      this.loadAsset(this.assetId);
    }
  }

  loadAsset(id: string) {
    this.api.getAssets().subscribe({
      next: (res: any) => {
        const found = res.find((a: any) => a._id === id);
        if (found) this.asset = { ...found };
      }
    });
  }

  saveAsset() {
    const { _id, userId, createdAt, updatedAt, __v, ...cleanData } = this.asset;

    if (this.assetId) {
      this.api.updateAsset(this.assetId, cleanData).subscribe({
        next: () => {
          alert('Asset Updated! ✅');
          this.router.navigate(['/assets']);
        },
        error: (err) => console.error(err)
      });
    } else {
      this.api.addAsset(cleanData).subscribe({
        next: () => {
          alert('Asset Created! ✅');
          this.router.navigate(['/assets']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}