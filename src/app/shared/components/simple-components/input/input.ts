import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, LabelComponent],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() errorMessage = '';
  @Input() requiredLabel: boolean = false;

  showError = false;
  showPassword = false;
  value: any = '';
  isDisabled = false;

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
    this.showError = true;
  }
}
