import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs";
import { PasswordValidators } from "../../../shared/utils/validators/password-match.validator";

export class UserAccessFormsFactory {
    static buildSignInForm(fb: FormBuilder): FormGroup {
        return fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }

    static buildSignUpForm(fb: FormBuilder): FormGroup {
        return fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        },
            { validators: PasswordValidators.passwordMatch('password', 'confirmPassword') });
    }

    static buildRequestCodeForm(fb: FormBuilder): FormGroup {
        return fb.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    static buildPasswordResetForm(fb: FormBuilder): FormGroup {
        return fb.group({
            code: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        },
            { validators: PasswordValidators.passwordMatch('password', 'confirmPassword') });
    }
}