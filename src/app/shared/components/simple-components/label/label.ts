import { Component, Input } from '@angular/core';
import { INPUT_STYLES } from '../../../styles/input-styles';

@Component({
  selector: 'app-label',
  imports: [],
  template: `
  @if (label) {
      <label [class]="styleLabel.text +' text-sm font-medium font-normal'">
        {{ label }} @if (requiredLabel) { <span>*</span>}
      </label>
  }`,
})
export class LabelComponent {
  @Input() label!: string;
  @Input() requiredLabel: boolean = false;

  private styles = INPUT_STYLES['default'];
  @Input() styleLabel = {
    text: this.styles.label,
  }
}
