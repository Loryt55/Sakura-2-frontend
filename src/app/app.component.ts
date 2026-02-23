import { Component } from '@angular/core';
import { PropertyListComponent } from './features/property/property-list/property-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PropertyListComponent],
  template: `
    <header>
      <h1>Rental <span>Manager</span></h1>
      <button class="btn-toggle" (click)="toggleDarkMode()">
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </header>
    <main>
      <app-property-list></app-property-list>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
  }
}
