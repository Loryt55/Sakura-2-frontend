import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rental, RentalForm } from '../../../core/models/rental.model';
import { Property } from '../../../core/models/property.model';
import { User } from '../../../core/models/user.model';
import { PropertyService } from '../../property/services/property.service';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent implements OnChanges, OnInit {
  @Input() rental?: Rental;
  @Output() save = new EventEmitter<RentalForm>();
  @Output() cancel = new EventEmitter<void>();

  properties: Property[] = [];
  tenants: User[] = [];

  form: RentalForm = {
    propertyId: 0,
    userId: 0,
    startDate: '',
    endDate: ''
  };

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // carica proprietà
    this.propertyService.getAllProperties().subscribe({
      next: data => {
        this.properties = data;
        if (this.rental) {
          const match = this.properties.find(p => p.name === this.rental!.propertyName);
          this.form.propertyId = match ? match.id : 0;
        }
      },
      error: err => console.error(err)
    });

    this.userService.getTenants().subscribe({
      next: data => {
        this.tenants = data;
        if (this.rental) {
          const match = this.tenants.find(t =>
            t.firstName + ' ' + t.lastName === this.rental!.userFullName
          );
          this.form.userId = match ? match.id : 0;
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rental'] && this.rental) {
      this.form = {
        propertyId: 0,
        userId: 0,
        startDate: this.rental.startDate,
        endDate: this.rental.endDate
      };
    } else {
      this.form = {
        propertyId: 0,
        userId: 0,
        startDate: '',
        endDate: ''
      };
    }
  }

  onSubmit() { this.save.emit(this.form); }
  onCancel() { this.cancel.emit(); }
}
