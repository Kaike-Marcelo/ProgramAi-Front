export interface NotificationListResponseDto {
    id: number;
    type: string;
    title: string;
    message: string;
    active: boolean;
    createdAt: string;
}

export interface NotificationUpdateResponseDto {
    success: boolean;
}