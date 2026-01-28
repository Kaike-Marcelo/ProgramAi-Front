import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ProfileUserFormFactory {
    static buildUpdateProfileUserForm(fb: FormBuilder): FormGroup {
        return fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            codenameId: ['', Validators.required],
        })
    }
}