import { Component, DestroyRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { SecondButtonComponent } from "../../../../shared/components/simple-components/button/second-button/second-button.component";
import { Router, RouterLink } from "@angular/router";
import { RequestSignUp } from '../../../../core/dtos/request/request-sign-up.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { UserService } from '../../../../services/user.service';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-user-access-sign-up',
  imports: [UserAccessContainer, InputComponent, ReactiveFormsModule, PrimaryButtonComponent, SecondButtonComponent, RouterLink],
  templateUrl: './user-access-sign-up.html',
})
export class UserAccessSignUp {
  #fb = inject(FormBuilder);
  #destroyRef = inject(DestroyRef);
  #userService = inject(UserService);
  #authService = inject(AuthenticationService);
  #FormValidationService = inject(FormValidationService)
  #snackBarService = inject(SnackbarService);
  #router = inject(Router);

  signUpForm = UserAccessFormsFactory.buildSignUpForm(this.#fb);

  hide = signal(true);
  r_loading = signal(false)

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  signUp() {
    if (!this.#FormValidationService.validateFormAndShowErrors(this.signUpForm, this.appInputs)) return;
    const { firstName, lastName, email, password } = this.signUpForm.getRawValue();

    const request: RequestSignUp = {
      firstName,
      lastName,
      email,
      password,
    };

    this.r_loading.set(true);
    this.#userService.createUser(request)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (response) => {
          this.#authService.setTokensLocalStorage(response.data)
          this.#snackBarService.showSuccess(response.message);
          this.#router.navigate(['/learner/home']);
        },
        error: (err: string[]) => {
          this.#snackBarService.showError(err[0]);
          this.r_loading.set(false);
        },
        complete: () => {
          this.r_loading.set(false);
        }
      });
  }

  getErrorMessage(controlName: string): string {
    return this.#FormValidationService.getErrorMessage(this.signUpForm, controlName);
  }
}
