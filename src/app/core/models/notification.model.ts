export interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    active: boolean;
    createdAt: string;
}

export interface NotificationUpdate {
    success: boolean;
}