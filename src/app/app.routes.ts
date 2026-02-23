import { Routes } from '@angular/router';
import {PropertyListComponent} from './features/property/property-list/property-list.component';
import {UserListComponent} from './features/user/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'users', component: UserListComponent },
];
