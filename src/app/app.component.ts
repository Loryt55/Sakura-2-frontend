import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>Sakura <span>Manager</span></h1>
      <nav>
        <a routerLink="/properties" routerLinkActive="active">Properties</a>
        <a routerLink="/users" routerLinkActive="active">Users</a>
        <a routerLink="/rentals" routerLinkActive="active">Rentals</a>
      </nav>
      <button class="btn-toggle" (click)="toggleDarkMode()">
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </header>
    <main>
      <router-outlet></router-outlet>
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
