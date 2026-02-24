import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rental, RentalForm } from '../../../core/models/rental.model';
import { RentalService } from '../services/rental.service';
import { RentalFormComponent } from '../rental-form/rental-form.component';

@Component({
  selector: 'app-rental-list',
  standalone: true,
  imports: [CommonModule, RentalFormComponent],
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent {
  rentals: Rental[] = [];
  showForm = false;
  editingRental?: Rental;

  constructor(private rentalService: RentalService) {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getAllRentals().subscribe({
      next: data => this.rentals = data,
      error: err => console.error(err)
    });
  }

  addNew() {
    this.editingRental = undefined;
    this.showForm = true;
  }

  edit(rental: Rental) {
    this.editingRental = { ...rental };
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingRental = undefined;
  }

  onSave(formData: RentalForm) {
    if (this.editingRental) {
      this.rentalService.updateRental(this.editingRental.id, formData).subscribe({
        next: () => { this.loadRentals(); this.showForm = false; },
        error: err => console.error(err)
      });
    } else {
      this.rentalService.createRental(formData).subscribe({
        next: () => { this.loadRentals(); this.showForm = false; },
        error: err => console.error(err)
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.rentalService.deleteRental(id).subscribe({
      next: () => this.loadRentals(),
      error: err => console.error(err)
    });
  }

  trackById(index: number, rental: Rental): number {
    return rental.id;
  }
}
