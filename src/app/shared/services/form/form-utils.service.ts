import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

interface FormatterConfig {
  fieldPath: string;
  pipe: { transform: (value: any) => any };
}

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  updateValidators(form: AbstractControl, path: string, validators: ValidatorFn[] = []) {
    const control = form.get(path);
    if (!control) return;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  formatFields(form: AbstractControl, config: FormatterConfig[], destroy: Subject<void>): void {
    config.forEach(({ fieldPath, pipe }) => {
      const control = form.get(fieldPath);
      if (!control) return;

      control.valueChanges
        .pipe(takeUntil(destroy))
        .subscribe((value: string) => {
          const formatted = pipe.transform(value || '');
          if (value !== formatted) {
            control.setValue(formatted, { emitEvent: false });
          }
        });
    })
  }

  extractDigits(value: string): string {
    return value ? value.replace(/\D/g, '') : '';
  }
}
