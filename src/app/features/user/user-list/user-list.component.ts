import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User, UserForm} from '../../../core/models/user.model';
import {UserService} from '../services/user.service';
import {UserFormComponent} from '../user-form/user-form.component';
import {ModalComponent} from '../../../core/components/modal/modal.component';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent, ModalComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [];
  showForm = false;
  editingUser?: User;
  @ViewChild(UserFormComponent) formComponent?: UserFormComponent;
  isLoading = true;

  constructor(private userService: UserService,
              private notificationService: NotificationService) {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.show('Failed to load users')
      }
    });
  }

  addNew() {
    this.editingUser = undefined;
    this.showForm = true;
  }

  edit(user: User) {
    this.editingUser = {...user};
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingUser = undefined;
  }

  onSave(formData: UserForm) {
    if (this.editingUser) {
      const {password, ...updateData} = formData; // ← esclude password dall'update
      this.userService.updateUser(this.editingUser.id, updateData).subscribe({
        next: () => {
          this.loadUsers();
          this.showForm = false;
          this.notificationService.show('user updated successfully', 'success');
        },
        error: () => this.notificationService.show('Failed to update user')
      });
    } else {
      this.userService.createUser(formData).subscribe({
        next: () => {
          this.loadUsers();
          this.showForm = false;
          this.formComponent?.resetLoading();
          this.notificationService.show('User created successfully', 'success');
        },
        error: (err) => {
          this.formComponent?.resetLoading();
          const message = err.status === 409
            ? 'Email already in use'
            : 'Failed to create user';
          this.notificationService.show(message, 'error');
        }
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.notificationService.show('user deleted successfully', 'success');
      },
      error: () => this.notificationService.show('Failed to delete user')
    });
  }

  trackById(index: number, user: User): number {
    return user.id;
  }
}
