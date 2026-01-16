import { Notification } from "../../../core/models/notification.model";

export interface NotificationState {
    notifications: Notification[] | null;
    loading: boolean;
}

export const initialNotificationState: NotificationState = {
    notifications: null,
    loading: false,
}