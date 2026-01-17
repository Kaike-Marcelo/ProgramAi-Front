import { inject, Injectable } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { UserStore } from "../store/user.store";
import { SnackbarService } from "../../../shared/services/snackbar.service";
import { RequestUpdateUser } from "../../../core/dtos/request/request-user.model";
import { finalize, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserActions {
    #userService = inject(UserService);
    #userStore = inject(UserStore);
    #snackbarService = inject(SnackbarService);

    loadAuthenticatedUser() {
        this.#userStore.setLoading(true);
        this.#userService.getAuthenticatedUser()
            .pipe(finalize(() => this.#userStore.setLoading(false)))
            .subscribe({
                next: (response) => {
                    const user = {
                        ...response.data,
                        createdAt: new Date(response.data.createdAt),
                        updatedAt: new Date(response.data.updatedAt),
                    }
                    this.#userStore.setUser(user);
                }, error: (error: string[]) => {
                    this.#snackbarService.showError(error[0]);
                    this.#userStore.clearUser();
                }
            });
    }

    updateUser(request: RequestUpdateUser) {
        this.#userStore.setLoading(true);
        return this.#userService.updateUser(request).pipe(
            finalize(() => this.#userStore.setLoading(false)),
            tap({
                next: (response) => {
                    this.#userStore.setUser(response.data);
                    this.#snackbarService.showSuccess(response.message);
                }, error: (error: string[]) => {
                    this.#snackbarService.showError(error[0]);
                }
            })
        );
    }

    loadCodenames() {
        this.#userStore.setLoading(true);
        this.#userService.getCodenameList()
            .pipe(finalize(() => this.#userStore.setLoading(false)))
            .subscribe({
                next: (request) => {
                    this.#userStore.setCodenameNameList(request.data);
                }, error: (error: string[]) => {
                    this.#snackbarService.showError(error[0]);
                }
            })
    }

    clearUser() {
        this.#userStore.clearUser();
    }
}