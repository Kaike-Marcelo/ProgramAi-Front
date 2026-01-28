import { AbstractControl } from "@angular/forms";

export class FormValidation {

  static getErrorMessage(control: AbstractControl | null): string {
    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return `O campo é obrigatório`;
    }
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `O campo deve ter no mínimo ${minLength} dígitos`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `O campo deve ter no máximo ${maxLength} dígitos`;
    }
    if (control.hasError('email')) {
      return `O campo deve ser um e-mail válido`;
    }
    if (control.hasError('passwordsMismatch')) {
      return `As senhas não coincidem.`;
    }
    if (control.hasError('pattern')) {
      return `O campo está fora do padrão esperado`;
    }
    if (control.hasError('phoneLength')) {
      return 'Telefone deve conter 10 ou 11 dígitos numéricos';
    }
    if (control.hasError('invalidDate')) {
      return 'Data inválida. Certifique-se de que você inseriu uma data válida.';
    }
    if (control.hasError('futureDate')) {
      return 'A data de nascimento não pode ser maior que a data atual.';
    }
    if (control.hasError('underage')) {
      return 'Você deve ser maior de idade.';
    }
    return '';
  }
}
