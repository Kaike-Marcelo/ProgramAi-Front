import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ModuleFormsFactory {
    static buildCreateModuleForm(fb: FormBuilder): FormGroup {
        return fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }
}