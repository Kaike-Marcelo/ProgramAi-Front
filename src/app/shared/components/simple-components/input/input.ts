import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label';
import { INPUT_STYLES } from '../../../styles/input-styles';

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

  private _stylesInput = INPUT_STYLES['default'];
  @Input() set stylesInput(value: any) {
    this._stylesInput = value || INPUT_STYLES['default'];
    this.styleInput = {
      background: this._stylesInput.background,
      text: this._stylesInput.text,
      border: this._stylesInput.border,
      label: this._stylesInput.label,
      error: this._stylesInput.error,
    };
  }

  styleInput = this._stylesInput;

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

  get stylesInput() {
    return this._stylesInput;
  }
}
