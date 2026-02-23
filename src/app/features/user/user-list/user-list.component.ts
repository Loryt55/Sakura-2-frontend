import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User, UserForm} from '../../../core/models/user.model';
import {UserService} from '../services/user.service';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [];
  showForm = false;
  editingUser?: User;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error(err)
    });
  }

  addNew() {
    this.editingUser = undefined;
    this.showForm = true;
  }

  edit(user: User) {
    this.editingUser = { ...user };
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingUser = undefined;
  }

  onSave(formData: UserForm) {
    if (this.editingUser) {
      const { password, ...updateData } = formData; // ← esclude password dall'update
      this.userService.updateUser(this.editingUser.id, updateData).subscribe({
        next: () => { this.loadUsers(); this.showForm = false; },
        error: err => console.error(err)
      });
    } else {
      this.userService.createUser(formData).subscribe({
        next: () => { this.loadUsers(); this.showForm = false; },
        error: err => console.error(err)
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }

  trackById(index: number, user: User): number {
    return user.id;
  }
}
