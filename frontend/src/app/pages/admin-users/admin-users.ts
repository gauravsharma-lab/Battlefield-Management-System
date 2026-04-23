import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {

  users: any[] = [];
  selectedUser: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err) => {
        console.error("Admin Access Error:", err);
      }
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    if (!this.selectedUser) return;

    this.api.updateUser(this.selectedUser._id, this.selectedUser).subscribe({
      next: () => {
        alert("User updated successfully! ✅");
        this.selectedUser = null;
        this.loadUsers();
      },
      error: (err) => console.error(err)
    });
  }

  deleteUser(id: string) {
    if (confirm('⚠️ Are you sure you want to delete this user? This cannot be undone.')) {
      this.api.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => console.error(err)
      });
    }
  }
}