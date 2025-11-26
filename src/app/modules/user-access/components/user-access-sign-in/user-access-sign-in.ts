import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { Router, RouterLink } from '@angular/router';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { SecondButtonComponent } from "../../../../shared/components/simple-components/button/second-button/second-button.component";
import { ExternalLoginComponent } from "../external-login/external-login.component";
import { RequestSignIn } from '../../../../core/dtos/request/request-sign-in.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-user-access-sign-in',
  imports: [UserAccessContainer, ReactiveFormsModule, InputComponent, RouterLink, PrimaryButtonComponent, SecondButtonComponent, ExternalLoginComponent],
  templateUrl: './user-access-sign-in.html',
})
export class UserAccessSignIn {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);
  #snackBarService = inject(SnackbarService);
  #router = inject(Router);

  authService = inject(AuthenticationService)

  signInForm = UserAccessFormsFactory.buildSignInForm(this.#fb);
  hide = signal(true);

  userAccessActions = signal(false);

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  signIn() {
    if (!this.#formValidationService.validateFormAndShowErrors(this.signInForm, this.appInputs)) return;
    const request: RequestSignIn = this.signInForm.value;

    this.userAccessActions.set(true);
    this.authService.signIn(request)
      .pipe()
      .subscribe({
        next: (res) => {
          this.#snackBarService.showSuccess(res.message);
          this.authService.setTokensLocalStorage(res.data);
          this.#router.navigate(['/learner/home'])
        },
        error: (err: string[]) => {
          this.#snackBarService.showError(err[0]);
          this.userAccessActions.set(false);
        },
        complete: () => {
            this.userAccessActions.set(false);
        }
      })
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.signInForm, controlName);
  }
}
