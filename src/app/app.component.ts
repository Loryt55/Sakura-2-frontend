import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from './features/auth/services/auth.service';
import {ThemeService} from './features/theme/services/ThemeService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header *ngIf="authService.isLoggedIn()">
      <h1>Sakura <span>Manager</span></h1>
      <nav>
        <a routerLink="/properties" routerLinkActive="active">Properties</a>
        <a routerLink="/users" routerLinkActive="active" *ngIf="authService.isAdmin()">Users</a>
        <a routerLink="/rentals" routerLinkActive="active">Rentals</a>
      </nav>
      <div class="header-right">
        <span class="user-info">
          {{ authService.getCurrentUser()?.firstName }}
          <span class="user-role">{{ authService.getCurrentUser()?.roleName }}</span>
        </span>
        <button class="btn-toggle" (click)="themeService.toggle()">
          {{ themeService.isDark ? '☀️' : '🌙' }}
        </button>
        <button class="btn-logout" (click)="logout()">Logout</button>
      </div>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
