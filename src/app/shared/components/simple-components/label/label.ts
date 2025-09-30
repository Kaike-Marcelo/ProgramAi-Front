import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  template: `
  @if (label) {
      <label class="text-base-100 text-sm font-medium font-normal">
        {{ label }} @if (requiredLabel) { <span>*</span>}
      </label>
  }`,
})
export class LabelComponent {
  @Input() label!: string;
  @Input() requiredLabel: boolean = false;
}
