import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Property, PropertyForm } from '../../../core/models/property.model';
import { UserService } from '../../user/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnChanges, OnInit {
  @Input() property?: Property;
  @Output() save = new EventEmitter<PropertyForm>();
  @Output() cancel = new EventEmitter<void>();

  owners: User[] = [];

  form: PropertyForm = {
    ownerId: 0,
    name: '',
    address: '',
    city: '',
    rooms: 1,
    pricePerMonth: 0
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getOwners().subscribe({
      next: data => {
        this.owners = data;

        // pre-compila ownerId in edit mode
        if (this.property) {
          const matchingOwner = this.owners.find(o =>
            o.firstName + ' ' + o.lastName === this.property!.ownerFullName
          );
          this.form.ownerId = matchingOwner ? matchingOwner.id : 0;
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.form = {
        ownerId: 0,
        name: this.property.name,
        address: this.property.address,
        city: this.property.city,
        rooms: this.property.rooms,
        pricePerMonth: this.property.pricePerMonth
      };
    } else {
      this.form = {
        ownerId: 0,
        name: '',
        address: '',
        city: '',
        rooms: 1,
        pricePerMonth: 0
      };
    }
  }

  onSubmit() { this.save.emit(this.form); }
  onCancel() { this.cancel.emit(); }
}
