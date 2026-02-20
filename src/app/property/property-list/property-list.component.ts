import { Component } from '@angular/core';
import {Property, PropertyForm, PropertyService} from '../property/property.service';
import { PropertyFormComponent } from '../property-form/property-form.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule,PropertyFormComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {
  properties: Property[] = [];
  showForm = false;
  editingProperty?: Property;

  constructor(private propertyService: PropertyService) {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getAllProperties().subscribe({
      next: data => this.properties = data,
      error: err => console.error(err),
    });
  }

  addNew() {
    console.log('AddNew clicked!');
    this.editingProperty = undefined;
    this.showForm = true;
    console.log('showForm:', this.showForm);
  }


  edit(prop: Property) {
    this.editingProperty = { ...prop };
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
        },
        error: err => console.error(err)
      });
    } else {
      this.propertyService.addProperty(formData).subscribe({
        next: () => {
          this.loadProperties();
          this.showForm = false;
        },
        error: err => console.error(err)
      });
    }
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.propertyService.deleteProperty(id).subscribe({
      next: () => this.loadProperties(),
      error: err => console.error(err)
    });
  }

  trackById(index: number, prop: Property): number {
    return prop.id;
  }

}
