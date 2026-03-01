import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Role, User, UserForm} from '../../../core/models/user.model';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges, OnInit {
  @Input() user?: User;
  @Output() save = new EventEmitter<UserForm>();
  @Output() cancel = new EventEmitter<void>();

  roles: Role[] = [];
  isEditing = false;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(6)]),
    roleId: new FormControl<number>(0, [Validators.required, Validators.min(1)])
  });

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: data => {
        this.roles = data;
        if (this.user) {
          const match = this.roles.find(r => r.name === this.user!.roleName);
          this.form.patchValue({roleId: match ? match.id : 0});
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.isEditing = true;

      this.form.get('password')?.setValidators([Validators.minLength(6)]);
      this.form.get('password')?.updateValueAndValidity();

      this.form.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        password: '',
        roleId: 0
      });
    } else {
      this.isEditing = false;

      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('password')?.updateValueAndValidity();

      this.form.reset({roleId: 0});
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.save.emit(this.form.value as UserForm);
  }

  onCancel() {
    this.cancel.emit();
  }
}
