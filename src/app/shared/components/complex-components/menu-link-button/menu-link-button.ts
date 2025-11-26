import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-menu-link-button',
  template: `
  <li>
    <a class="flex items-center gap-2 p-3 hover:bg-secondary hover:text-primary rounded cursor-pointer text-base-100">
      <i class="{{ icon }}"></i>
      {{ name }}
    </a>
  </li>`,
})
export class MenuLinkButtonComponent {
  @Input() icon!: string;
  @Input() name!: string;
}
