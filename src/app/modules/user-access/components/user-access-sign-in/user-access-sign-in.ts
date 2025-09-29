import { Component, inject, signal } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { RouterLink } from '@angular/router';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';

@Component({
  selector: 'app-user-access-sign-in',
  imports: [UserAccessContainer, ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './user-access-sign-in.html',
})
export class UserAccessSignIn {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService)

  signInForm = UserAccessFormsFactory.buildSignInForm(this.#fb);
  hide = signal(true);
  
  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.signInForm, controlName);
  }
}
