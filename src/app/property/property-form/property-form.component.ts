import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Property } from '../property/property.service';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnChanges {
  @Input() property?: Property;
  @Output() save = new EventEmitter<Omit<Property, 'id'| 'active'>>();
  @Output() cancel = new EventEmitter<void>();

  form: Omit<Property, 'id'| 'active'> = {
    name: '',
    address: '',
    city: '',
    rooms: 1,
    pricePerMonth: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      const { id, active, ...formData } = this.property;
      this.form = formData;
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
