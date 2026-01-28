import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {
    static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const password = formGroup.get(passwordField)?.value;
            const confirmPassword = formGroup.get(confirmPasswordField)?.value;

            return password !== confirmPassword
                ? (formGroup.get(confirmPasswordField)?.setErrors({ passwordsMismatch: true }), null)
                : (formGroup.get(confirmPasswordField)?.setErrors(null), null);
        }
    }
}