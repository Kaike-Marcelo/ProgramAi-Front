import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { Router } from "@angular/router";
import { RequestSignUp } from '../../../../core/dtos/request/request-sign-up.model';
import { UserAccessActions } from '../../actions/user-access.actions';
import { SIGN_UP_IMPORTS } from '../../utils/imports';

@Component({
  selector: 'app-user-access-sign-up',
  imports: [SIGN_UP_IMPORTS],
  templateUrl: './user-access-sign-up.html',
})
export class UserAccessSignUp {
  #fb = inject(FormBuilder);
  #actions = inject(UserAccessActions);
  #FormValidationService = inject(FormValidationService)
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

    this.#actions.signUp(request)
      .subscribe(() => {
        this.#router.navigate(['/learner/home']);
      });
  }

  getErrorMessage(controlName: string): string {
    return this.#FormValidationService.getErrorMessage(this.signUpForm, controlName);
  }
}
