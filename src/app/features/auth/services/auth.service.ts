import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoggedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUser: LoggedUser | null = null;

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  login(email: string, password: string): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): LoggedUser | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getRole(): string | null {
    return this.currentUser?.roleName ?? null;
  }

  isAdmin(): boolean { return this.getRole() === 'ADMIN'; }
  isOwner(): boolean { return this.getRole() === 'OWNER'; }
  isTenant(): boolean { return this.getRole() === 'TENANT'; }
}
