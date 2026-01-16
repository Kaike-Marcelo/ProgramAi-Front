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
                    console.log('Notificações Carregadas: ', response.data);
                }, error: (error: string[]) => {
                    console.error('Erro ao carregar notificações: ', error);
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
                    console.log('Notificações não lidas carregadas: ', response.data);
                }, error: (error: string[]) => {
                    console.error('Erro ao carregar notificações não lidas: ', error);
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
                        console.log('Notificação marcada como lida: ', response.data);
                    }
                }, error: (error: string[]) => {
                    console.error('Erro ao marcar notificação como lida: ', error);
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
                        console.log('Todas as notificações marcadas como lidas: ', response.data);
                    }
                }, error: (error: string[]) => {
                    console.error('Erro ao marcar todas as notificações como lidas: ', error);
                    this.#snackbarService.showError(error[0]);
                }
            })
    }
}