import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { UserAccessFormsFactory } from '../../../helpers/user-access-forms.factory';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../../../../../shared/services/form/form-validation.service';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from "../../../../../shared/components/simple-components/button/primary-button/primary-button.component";
import { InputComponent } from "../../../../../shared/components/simple-components/input/input";

@Component({
  selector: 'app-password-reset-form',
  imports: [ReactiveFormsModule, PrimaryButtonComponent, InputComponent],
  templateUrl: './password-reset-form.component.html',
})
export class PasswordResetFormComponent {
  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);
  #router = inject(Router)

  loading = signal(false)

  passwordResetForm = UserAccessFormsFactory.buildPasswordResetForm(this.#fb);

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;

  onPasswordReset(): void {
    if (!this.#formValidationService.validateFormAndShowErrors(this.passwordResetForm, this.appInputs)) return;
  }

  prepareData() {
    const formValue = this.passwordResetForm.getRawValue();
    return {
      newPassword: formValue.password,
      confirmPassword: formValue.confirmPassword,
      code: formValue.code,
    };
  }

  caseSuccess() {
    this.#router.navigate(['/sign-in']);
    this.passwordResetForm.reset();
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.passwordResetForm, controlName);
  }
}