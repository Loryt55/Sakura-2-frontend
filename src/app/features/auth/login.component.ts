import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {ThemeService} from '../theme/services/ThemeService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {
  }

  onSubmit() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        // reindirizza in base al ruolo
        if (user.roleName === 'ADMIN') {
          this.router.navigate(['/properties']);
        } else if (user.roleName === 'OWNER') {
          this.router.navigate(['/properties']);
        } else {
          this.router.navigate(['/properties']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
