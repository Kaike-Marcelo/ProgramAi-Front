import { inject, Injectable } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { NotificationStore } from "./notification.store";
import { finalize } from "rxjs";
import { SnackbarService } from "../../services/snackbar.service";

@Injectable({ providedIn: 'root' })
export class NotificationActions {
    #notificationService = inject(NotificationService);
    #notificationStore = inject(NotificationStore);
    #snackbarService = inject(SnackbarService);

    loadAllNotifications(limit: number) {
        this.#notificationStore.setLoading(true);
        this.#notificationService.notificationList({ onlyActive: false, limit: limit })
            .pipe(finalize(() => this.#notificationStore.setLoading(false)))
            .subscribe({
                next: (response) => {
                    this.#notificationStore.setNotifications(response.data);
                }, error: (error: string[]) => {
                    this.#notificationStore.clearNotifications();
                }
            })
    }

    loadUnreadNotifications(limit: number) {
        this.#notificationStore.setLoading(true);
        this.#notificationService.notificationList({ onlyActive: true, limit: limit })
            .pipe(finalize(() => this.#notificationStore.setLoading(false)))
            .subscribe({
                next: (response) => {
                    this.#notificationStore.setNotifications(response.data);
                }, error: (error: string[]) => {
                    this.#notificationStore.clearNotifications();
                }
            })
    }

    markNotificationAsRead(id: number) {
        this.#notificationStore.setLoading(true);
        this.#notificationService.notificationUpdate({ all: false, notificationId: id })
            .pipe(finalize(() => this.#notificationStore.setLoading(false)))
            .subscribe({
                next: (response) => {
                    if (response.data.success) {
                        const currentNotifications = this.#notificationStore.snapshot.notifications;
                        if (currentNotifications) {
                            const updatedNotifications = currentNotifications?.map(
                                notification => notification.id === id
                                    ? { ...notification, active: false } : notification
                            );
                            this.#notificationStore.setNotifications(updatedNotifications);
                        }
                    }
                }, error: (error: string[]) => {
                    this.#snackbarService.showError(error[0]);
                }
            })
    }

    markAllNotificationAsRead() {
        this.#notificationStore.setLoading(true);
        this.#notificationService.notificationUpdate({ all: true, notificationId: 0 })
            .pipe(finalize(() => this.#notificationStore.setLoading(false)))
            .subscribe({
                next: (response) => {
                    const currentNotifications = this.#notificationStore.snapshot.notifications;
                    if (response.data.success && currentNotifications) {
                        const updatedNotifications = currentNotifications.map(
                            notification => ({ ...notification, active: false })
                        );
                        this.#notificationStore.setNotifications(updatedNotifications);
                    }
                }, error: (error: string[]) => {
                    this.#snackbarService.showError(error[0]);
                }
            })
    }
}