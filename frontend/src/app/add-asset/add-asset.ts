import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-asset.html',
  styleUrl: './add-asset.css',
})
export class AddAsset {

  asset = {
    name: '',
    type: '',
    team: 'friendly',
    latitude: 0,
    longitude: 0,
    speed: 0,
    fuel: 0,
    radarRange: 0,
    weaponRange: 0,
    status: 'active'
  };

  constructor(private api: ApiService) {}

  addAsset() {
    this.api.addAsset(this.asset).subscribe({
      next: (res: any) => {
        console.log("Asset Added ✅", res);

        alert("Asset Added Successfully ✅");

        // 🔥 IMPORTANT: refresh asset list
        this.api.triggerAssetRefresh();

        // reset form
        this.asset = {
          name: '',
          type: '',
          team: 'friendly',
          latitude: 0,
          longitude: 0,
          speed: 0,
          fuel: 0,
          radarRange: 0,
          weaponRange: 0,
          status: 'active'
        };
      },
      error: (err: any) => {
        console.error("Add Asset Error ❌", err);
        alert("Failed to add asset ❌");
      }
    });
  }
}