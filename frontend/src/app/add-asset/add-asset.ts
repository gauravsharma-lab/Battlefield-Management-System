import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

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
  status: ''
};

  constructor(private api: ApiService) {}

 addAsset() {
  this.api.addAsset(this.asset).subscribe({
    next: (res) => {
      console.log("Added:", res);
      alert("Asset added successfully ✅");
    },
    error: (err) => {
      console.error(err);
      alert("Error adding asset ❌");
    }
  });
}
}