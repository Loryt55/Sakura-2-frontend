import { Component } from '@angular/core';
import { PropertyListComponent } from './property/property-list/property-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PropertyListComponent],
  template: `
    <header>
      <h1>Property Management</h1>
      <button class="btn-toggle" (click)="toggleDarkMode()">Toggle Dark Mode</button>
    </header>

    <main>
      <app-property-list></app-property-list>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
