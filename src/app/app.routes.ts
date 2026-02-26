import { Routes } from '@angular/router';
import {PropertyListComponent} from './features/property/property-list/property-list.component';
import {UserListComponent} from './features/user/user-list/user-list.component';
import {RentalListComponent} from './features/rental/rental-list/rental-list.component';
import {LoginComponent} from './features/auth/login.component';
import {authGuard} from './features/auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent, canActivate: [authGuard] },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'rentals', component: RentalListComponent, canActivate: [authGuard] },
];
