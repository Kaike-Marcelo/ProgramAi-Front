import { inject, Injectable, signal } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { SnackbarService } from "../../../shared/services/snackbar.service";
import { RequestSignIn } from "../../../core/dtos/request/request-sign-in.model";
import { tap } from "rxjs";
import { RequestSignUp } from "../../../core/dtos/request/request-sign-up.model";
import { UserService } from "../../../services/user.service";

@Injectable({ providedIn: 'root' })
export class UserAccessActions {
    #authService = inject(AuthenticationService);
    #userService = inject(UserService);
    #snackBarService = inject(SnackbarService);

    public readonly loading = signal(false);

    signIn(request: RequestSignIn) {
        this.loading.set(true);
        return this.#authService.signIn(request)
            .pipe(
                tap({
                    next: (res) => {
                        this.#authService.setTokensLocalStorage(res.data);
                    },
                    error: (err: string[]) => {
                        this.#snackBarService.showError(err[0]);
                    },
                    finalize: () => {
                        this.loading.set(false);
                    }
                })
            )
    }

    signUp(request: RequestSignUp) {
        this.loading.set(true);
        return this.#userService.createUser(request)
            .pipe(
                tap({
                    next: (response) => {
                        this.#authService.setTokensLocalStorage(response.data)
                    },
                    error: (err: string[]) => {
                        this.#snackBarService.showError(err[0]);
                    },
                    finalize: () => {
                        this.loading.set(false);
                    }
                })
            )
    }
}