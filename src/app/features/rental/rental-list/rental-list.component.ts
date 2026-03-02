import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rental, RentalForm } from '../../../core/models/rental.model';
import { RentalService } from '../services/rental.service';
import { RentalFormComponent } from '../rental-form/rental-form.component';
import {ModalComponent} from '../../../core/components/modal/modal.component';
import {AuthService} from '../../../core/services/auth.service';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-rental-list',
  standalone: true,
  imports: [CommonModule, RentalFormComponent, ModalComponent],
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent {
  rentals: Rental[] = [];
  showForm = false;
  editingRental?: Rental;

  constructor(private readonly rentalService: RentalService,
              public authService: AuthService,
              private notificationService: NotificationService) {
    this.loadRentals();
  }

  canAdd(): boolean {
    return this.authService.isAdmin() || this.authService.isOwner();
  }

  canEdit(): boolean {
    return this.authService.isAdmin() || this.authService.isOwner();
  }

  canDelete(): boolean {
    return this.authService.isAdmin() || this.authService.isOwner();
  }

  loadRentals() {
    this.rentalService.getAllRentals().subscribe({
      next: data => this.rentals = data,
      error: () => this.notificationService.show('Failed to load rentals')
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
        next: () => {
          this.loadRentals();
          this.showForm = false;
          this.showForm = false; this.notificationService.show('rental updated successfully', 'success');
        },
        error: () => this.notificationService.show('Failed to update rental')
      });
    } else {
      this.rentalService.createRental(formData).subscribe({
        next: () => {
          this.loadRentals();
          this.showForm = false;
          this.notificationService.show('rental created successfully', 'success');
        },
        error: () => this.notificationService.show('Failed to create rental')
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.rentalService.deleteRental(id).subscribe({
      next: () => {
        this.loadRentals();
        this.notificationService.show('rental deleted successfully', 'success');
      },
      error: () => this.notificationService.show('Failed to delete rental')
    });
  }

  trackById(index: number, rental: Rental): number {
    return rental.id;
  }
}
