import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Property, PropertyForm} from '../property/property.service';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnChanges {
  @Input() property?: Property;
  @Output() save = new EventEmitter<PropertyForm>();
  @Output() cancel = new EventEmitter<void>();

  form: PropertyForm = {
    name: '',
    address: '',
    city: '',
    rooms: 1,
    pricePerMonth: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.form = {
        name: this.property.name,
        address: this.property.address,
        city: this.property.city,
        rooms: this.property.rooms,
        pricePerMonth: this.property.pricePerMonth
      };
    } else {
      this.form = {
        name: '',
        address: '',
        city: '',
        rooms: 1,
        pricePerMonth: 0
      };
    }
  }

  onSubmit() {
    this.save.emit(this.form);
  }

  onCancel() {
    this.cancel.emit();
  }
}
