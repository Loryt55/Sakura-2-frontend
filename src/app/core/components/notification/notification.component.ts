import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppNotification, NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: AppNotification | null = null;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.notification.subscribe(n => {
      this.notification = n;
    });
  }

  dismiss() {
    this.notificationService.dismiss();
  }
}
