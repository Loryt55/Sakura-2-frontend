import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface AppNotification {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new BehaviorSubject<AppNotification | null>(null);
  notification = this.notification$.asObservable();
  private timeoutId: any;

  show(message: string, type: 'error' | 'success' = 'error') {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.notification$.next({ message, type });
    this.timeoutId = setTimeout(() => {
      this.notification$.next(null);
    }, 4000);
  }

  dismiss() {
    this.notification$.next(null);
  }
}
