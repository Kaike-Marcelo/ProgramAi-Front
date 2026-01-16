import { Component, inject, Input, OnInit } from '@angular/core';
import { NotificationStore } from '../../../stores/notification/notification.store';
import { NotificationActions } from '../../../stores/notification/notification.actions';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-notification-badge',
  imports: [RouterLink],
  templateUrl: './notification-badge.html',
})
export class NotificationBadge implements OnInit {
  @Input() buttonClass: string = 'btn-ghost';

  #notificationStore = inject(NotificationStore);
  #notificationActions = inject(NotificationActions);

  notifications = this.#notificationStore.notifications;
  unreadCount = this.#notificationStore.unreadCount;
  loading = this.#notificationStore.loading;

  maxNumberOfNotifications: number = 10;

  ngOnInit(): void {
    this.#notificationActions.loadUnreadNotifications(this.maxNumberOfNotifications);
  }

  markAsRead(id: number): void {
    this.#notificationActions.markNotificationAsRead(id);
  }

  markAllAsRead(): void {
    this.#notificationActions.markAllNotificationAsRead();
  }
}
