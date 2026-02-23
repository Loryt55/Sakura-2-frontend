import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserForm } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() user?: User;
  @Output() save = new EventEmitter<UserForm>();
  @Output() cancel = new EventEmitter<void>();

  form: UserForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roleId: 0
  };

  isEditing = false; // ← utile per nascondere il campo password in edit mode

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.isEditing = true;
      this.form = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        password: '',      // ← vuota in edit, non la mostriamo
        roleId: 0          // ← non abbiamo roleId nella risposta, solo roleName
      };
    } else {
      this.isEditing = false;
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roleId: 0
      };
    }
  }

  onSubmit() { this.save.emit(this.form); }
  onCancel() { this.cancel.emit(); }
}
