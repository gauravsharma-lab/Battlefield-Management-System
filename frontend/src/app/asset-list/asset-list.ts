
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';

// ✅ ADD THIS
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-list',
  standalone: true,

  // ✅ ADD THIS LINE
  imports: [CommonModule],

  templateUrl: './asset-list.html'
})
export class AssetList implements OnInit {

  assets: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadAssets();
  }

 loadAssets() {
  this.api.getAssets().subscribe(data => {
    console.log("DATA 👉", data);   // ✅ PASTE HERE
    this.assets = data;
  });
}

  delete(id: string) {
    this.api.deleteAsset(id).subscribe(() => {
      this.loadAssets();
    });
  }
}

