import {Component} from '@angular/core';
import {PropertyFormComponent} from '../property-form/property-form.component';
import {CommonModule} from '@angular/common';
import {Property, PropertyForm} from '../../../core/models/property.model';
import {PropertyService} from '../services/property.service';
import {ModalComponent} from '../../../core/components/modal/modal.component';
import {AuthService} from '../../auth/services/auth.service';
import {NotificationService} from '../../notification/services/notification.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFormComponent, ModalComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {
  properties: Property[] = [];
  showForm = false;
  editingProperty?: Property;

  constructor(private readonly propertyService: PropertyService,
              public authService: AuthService,
              private notificationService: NotificationService) {
    this.loadProperties();
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

  loadProperties() {
    this.propertyService.getAllProperties().subscribe({
      next: data => this.properties = data,
      error: () => this.notificationService.show('Failed to load properties')
    });
  }

  addNew() {
    console.log('AddNew clicked!');
    this.editingProperty = undefined;
    this.showForm = true;
    console.log('showForm:', this.showForm);
  }


  edit(prop: Property) {
    this.editingProperty = {...prop};
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingProperty = undefined;
  }

  onSave(formData: PropertyForm) {
    if (this.editingProperty) {
      this.propertyService.updateProperty(this.editingProperty.id, formData).subscribe({
        next: () => {
          this.loadProperties();
          this.showForm = false;
          this.notificationService.show('Property updated successfully', 'success');
        },
        error: () => this.notificationService.show('Failed to update property')
      });
    } else {
      this.propertyService.addProperty(formData).subscribe({
        next: () => {
          this.loadProperties();
          this.showForm = false;
          this.notificationService.show('Property created successfully', 'success');
        },
        error: () => this.notificationService.show('Failed to create property')
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.propertyService.deleteProperty(id).subscribe({
      next: () => {
        this.loadProperties();
        this.notificationService.show('Property deleted successfully', 'success');
      },
      error: () => this.notificationService.show('Failed to delete property')
    });
  }

  trackById(index: number, prop: Property): number {
    return prop.id;
  }

}
