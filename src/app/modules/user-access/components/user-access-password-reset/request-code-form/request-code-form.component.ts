import { Component, inject, QueryList, ViewChildren, ViewChild, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../../../../../shared/services/form/form-validation.service';
import { ModalComponent } from "../../../../../shared/components/simple-components/modal/modal.component";
import { UserAccessFormsFactory } from '../../../helpers/user-access-forms.factory';
import { InputComponent } from '../../../../../shared/components/simple-components/input/input';

@Component({
  selector: 'app-request-code-form',
  imports: [InputComponent, ReactiveFormsModule, ModalComponent],
  templateUrl: './request-code-form.component.html',
})
export class RequestCodeFormComponent {

  #fb = inject(FormBuilder);
  #formValidationService = inject(FormValidationService);

  requestCodeForm = UserAccessFormsFactory.buildRequestCodeForm(this.#fb);
  loading = signal(false)

  @ViewChildren(InputComponent) appInputs!: QueryList<InputComponent>;
  @ViewChild('requestCodeFormModal') requestCodeFormModal!: ModalComponent;

  onRequestCode(): void {
    if (!this.#formValidationService.validateFormAndShowErrors(this.requestCodeForm, this.appInputs)) {
      return;
    }
    const email = this.requestCodeForm.get('email')?.value;
    this.requestCodeFormModal.open();
  }

  getErrorMessage(controlName: string): string {
    return this.#formValidationService.getErrorMessage(this.requestCodeForm, controlName);
  }
}