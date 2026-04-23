import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.css'
})
export class AssetList implements OnInit {

  assets: any[] = [];
  selectedAsset: any = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAssets();

    this.api.refreshAssets$.subscribe(() => {
      this.loadAssets();
    });
  }

  // ✅ FIXED
loadAssets() {
  this.api.getAssets().subscribe({
    next: (res: any) => {
      this.assets = res ?? [];
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.error(err);
      this.assets = [];
    }
  });
}

  // ✅ FIXED
  deleteAsset(id: string) {
    this.api.deleteAsset(id).subscribe({
      next: () => {
        this.loadAssets();
      },
      error: (err) => console.error(err)
    });
  }

  editAsset(asset: any) {
    this.selectedAsset = { ...asset };
  }

  // ✅ FIXED (IMPORTANT: you were missing API service)
  updateAsset() {
  this.api.updateAsset(this.selectedAsset._id, this.selectedAsset)
    .subscribe({
      next: (res) => {
        console.log("Updated ✅", res);

        // ✅ ALERT ADDED
        alert("Asset updated successfully ✅");

        this.selectedAsset = null;
        this.loadAssets();
      },
      error: (err) => {
        console.error("Update Error ❌", err);
        alert("Failed to update asset ❌");
      }
    });
}
}