import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class UserAccessFormsFactory {
    static buildSignInForm(fb: FormBuilder): FormGroup {
        return fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }
}