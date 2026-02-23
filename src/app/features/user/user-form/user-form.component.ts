import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserForm, Role } from '../../../core/models/user.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges, OnInit {
  @Input() user?: User;
  @Output() save = new EventEmitter<UserForm>();
  @Output() cancel = new EventEmitter<void>();

  roles: Role[] = [];
  isEditing = false;

  form: UserForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roleId: 0
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: data => {
        this.roles = data;

        if (this.user) {
          const matchingRole = this.roles.find(r => r.name === this.user!.roleName);
          this.form.roleId = matchingRole ? matchingRole.id : 0;
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.isEditing = true;
      this.form = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        password: '',
        roleId: 0
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
