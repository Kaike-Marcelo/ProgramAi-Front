import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationStore } from '../../../stores/notification/notification.store';
import { NotificationActions } from '../../../stores/notification/notification.actions';
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-badge',
  imports: [RouterLink, DatePipe],
  templateUrl: './notification-badge.html',
})
export class NotificationBadge implements OnInit, OnDestroy {
  @Input() buttonClass: string = 'btn-ghost';
  @Input() dropdownPosition: 'dropdown-start' | 'dropdown-end' | 'dropdown-center' = 'dropdown-start';
  @Input() dropdownDirection: 'dropdown-bottom' | 'dropdown-top' | 'dropdown-left' | 'dropdown-right' = 'dropdown-bottom';
  @Input() enablePolling: boolean = true;
  @Input() pollingInterval: number = 30000;

  #notificationStore = inject(NotificationStore);
  #notificationActions = inject(NotificationActions);

  notifications = this.#notificationStore.notifications;
  unreadCount = this.#notificationStore.unreadCount;
  loading = this.#notificationStore.loading;

  maxNumberOfNotifications: number = 10;

  ngOnInit(): void {
    if (this.enablePolling) {
      this.#notificationActions.startPolling(this.maxNumberOfNotifications, this.pollingInterval);
    } else {
      this.#notificationActions.loadUnreadNotifications(this.maxNumberOfNotifications);
    }
  }

  ngOnDestroy(): void {
    this.#notificationActions.stopPolling();
  }

  markAsRead(id: number): void {
    this.#notificationActions.markNotificationAsRead(id);
  }

  markAllAsRead(): void {
    this.#notificationActions.markAllNotificationAsRead();
  }
}
