import { inject, Injectable, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';
import { InputComponent } from '../../components/simple-components/input/input';
import { FormValidation } from '../../helpers/decode-JWT/form-validation';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  snackBar = inject(SnackbarService)

  getErrorMessage(form: FormGroup, path: string): string {
    const control = form.get(path);
    return control ? FormValidation.getErrorMessage(control) : '';
  }

  validateFormAndShowErrors(form: FormGroup, inputs: QueryList<InputComponent>): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      inputs.forEach(input => input.onBlur());
      this.snackBar.showError('Preencha todos os campos obrigatórios corretamente');
      return false;
    }
    return true;
  }
}
