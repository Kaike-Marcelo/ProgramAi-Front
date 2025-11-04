import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { UserAccessContainer } from "../user-access-container/user-access-container";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserAccessFormsFactory } from '../../helpers/user-access-forms.factory';
import { InputComponent } from "../../../../shared/components/simple-components/input/input";
import { FormValidationService } from '../../../../shared/services/form/form-validation.service';
import { PrimaryButtonComponent } from "../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { SecondButtonComponent } from "../../../../shared/components/simple-components/button/second-button/second-button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-access-sign-up',
  imports: [UserAccessContainer, InputComponent, ReactiveFormsModule, PrimaryButtonComponent, SecondButtonComponent, RouterLink],
  templateUrl: './user-access-sign-up.html',
})
export class UserAccessSignUp {
  #fb = inject(FormBuilder);
  #FormValidationService = inject(FormValidationService)

  signUpForm = UserAccessFormsFactory.buildSignUpForm(this.#fb);

  hide = signal(true);

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  signUp() {
    if (!this.#FormValidationService.validateFormAndShowErrors(this.signUpForm, this.appInputs)) return;
  }

  getErrorMessage(controlName: string): string {
    return this.#FormValidationService.getErrorMessage(this.signUpForm, controlName);
  }
}
