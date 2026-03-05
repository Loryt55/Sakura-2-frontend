import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Property, PropertyForm} from '../../../core/models/property.model';
import {UserService} from '../../user/services/user.service';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnChanges, OnInit {
  @Input() property?: Property;
  @Output() save = new EventEmitter<PropertyForm>();
  @Output() cancel = new EventEmitter<void>();

  owners: User[] = [];
  isLoading = false;

  form = new FormGroup({
    ownerId: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    rooms: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    pricePerMonth: new FormControl<number>(0, [Validators.required, Validators.min(0.01)])
  });

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getOwners().subscribe({
      next: data => {
        this.owners = data;
        if (this.property) {
          const match = this.owners.find(o =>
            o.firstName + ' ' + o.lastName === this.property!.ownerFullName
          );
          this.form.patchValue({ownerId: match ? match.id : 0});
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.form.patchValue({
        ownerId: 0,
        name: this.property.name,
        address: this.property.address,
        city: this.property.city,
        rooms: this.property.rooms,
        pricePerMonth: this.property.pricePerMonth
      });
    } else if (changes['property'] && !this.property) {
      this.form.reset({ownerId: 0, rooms: 1, pricePerMonth: 0});
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.isLoading) return;

    this.isLoading = true;
    this.save.emit(this.form.value as PropertyForm);
  }

  onCancel() {
    this.isLoading = false;
    this.cancel.emit();
  }

  resetLoading() {
    this.isLoading = false;
  }

}
