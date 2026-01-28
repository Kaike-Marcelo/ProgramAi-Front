export interface RequestNotificationList {
    onlyActive: boolean;
    limit: number;
}

export interface RequestNotificationUpdate {
    all: boolean;
    notificationId?: number;
}