import { computed, Injectable, signal } from "@angular/core";
import { initialNotificationState, NotificationState } from "./notification.state";
import { Notification } from "../../../core/models/notification.model";

@Injectable({ providedIn: 'root' })
export class NotificationStore {
    private notificationState = signal<NotificationState>(initialNotificationState);

    public readonly notifications = computed(() => this.notificationState().notifications);
    public readonly loading = computed(() => this.notificationState().loading);
    public readonly unreadCount = computed(() => {
        const notifications = this.notificationState().notifications;
        if (!notifications) return 0;
        return notifications.filter(notification => notification.active).length;
    });

    setNotifications(notifications: Notification[] | null) {
        this.notificationState.update(state => ({ ...state, notifications }));
    }

    setLoading(loading: boolean) {
        this.notificationState.update(state => ({ ...state, loading }));
    }

    clearNotifications() {
        this.notificationState.set(initialNotificationState);
    }

    get snapshot(): NotificationState {
        return this.notificationState();
    }
}