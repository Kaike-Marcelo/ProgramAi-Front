import { Component, inject } from '@angular/core';
import { NotificationActions } from '../../shared/stores/notification/notification.actions';
import { NotificationStore } from '../../shared/stores/notification/notification.store';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
})
export class Notifications {
  #notificationStore = inject(NotificationStore);
  #notificationActions = inject(NotificationActions);

  notifications = this.#notificationStore.notifications;
  unreadCount = this.#notificationStore.unreadCount;
  loading = this.#notificationStore.loading;

  ngOnInit(): void {
    this.#notificationActions.loadUnreadNotifications(50);
  }

  loadAll(): void {
    this.#notificationActions.loadAllNotifications(50);
  }

  loadUnread(): void {
    this.#notificationActions.loadUnreadNotifications(50);
  }

  markAsRead(id: number): void {
    this.#notificationActions.markNotificationAsRead(id);
  }

  markAllAsRead(): void {
    this.#notificationActions.markAllNotificationAsRead();
  }
}
