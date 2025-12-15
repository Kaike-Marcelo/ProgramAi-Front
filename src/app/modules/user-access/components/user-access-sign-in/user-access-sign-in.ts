import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { Router } from '@angular/router';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { RequestSignIn } from '../../../../core/dtos/request/request-sign-in.model';
import { UserAccessActions } from '../../actions/user-access.actions';
import { SIGN_IN_IMPORTS } from '../../utils/imports';

@Component({
  selector: 'app-user-access-sign-in',
  imports: [SIGN_IN_IMPORTS],
  templateUrl: './user-access-sign-in.html',
})
export class UserAccessSignIn {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);
  #router = inject(Router);
  #actions = inject(UserAccessActions);

  loading = this.#actions.loading;
  signInForm = UserAccessFormsFactory.buildSignInForm(this.#fb);
  hide = signal(true);

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  signIn() {
    if (!this.#formValidationService.validateFormAndShowErrors(this.signInForm, this.appInputs)) return;
    const request: RequestSignIn = this.signInForm.value;
    this.#actions.signIn(request)
      .subscribe(() => {
        this.#router.navigate(['/learner/home']);
      });
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.signInForm, controlName);
  }
}
