import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';  // adjust path if needed

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
  private http: HttpClient,
  private auth: AuthService   // ✅ ADD THIS
) {}

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
  const token = this.auth.getToken();

  this.http.get<any[]>('http://localhost:5000/api/assets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (res) => {
      console.log("DATA 👉", res);
      this.assets = res;
    },
    error: (err) => {
      console.error("ERROR ❌", err);
    }
  });
}
  deleteAsset(id: string) {
    this.http.delete(`http://localhost:5000/api/assets/${id}`)
      .subscribe(() => {
        alert("Deleted ✅");
        this.loadAssets();
      });
  }

  editAsset(asset: any) {
  console.log("EDIT CLICKED 👉", asset); // 👈 ADD THIS
  this.selectedAsset = { ...asset };
}

  updateAsset() {
    this.http.put(
      `http://localhost:5000/api/assets/${this.selectedAsset._id}`,
      this.selectedAsset
    ).subscribe(() => {
      alert("Updated ✅");
      this.selectedAsset = null;
      this.loadAssets();
    });
  }
}