import { Component, inject, signal } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { RouterLink } from '@angular/router';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { SecondButtonComponent } from "../../../../shared/components/simple-components/button/second-button/second-button.component";
import { ExternalLoginComponent } from "../external-login/external-login.component";

@Component({
  selector: 'app-user-access-sign-in',
  imports: [UserAccessContainer, ReactiveFormsModule, InputComponent, RouterLink, PrimaryButtonComponent, SecondButtonComponent, ExternalLoginComponent],
  templateUrl: './user-access-sign-in.html',
})
export class UserAccessSignIn {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService)

  signInForm = UserAccessFormsFactory.buildSignInForm(this.#fb);
  hide = signal(true);

  userAccessActions = signal(false);
  
  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.signInForm, controlName);
  }
}
