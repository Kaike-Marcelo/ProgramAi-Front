import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-menu-link-button',
  template: `
  <li>
    <a class="flex flex-col lg:flex-row items-center gap-0 lg:gap-2 lg:p-3 hover:bg-secondary hover:text-primary rounded cursor-pointer text-base-100 text-xs lg:text-sm">
      <i class="{{ icon }}"></i>
      {{ name }}
    </a>
  </li>`,
})
export class MenuLinkButtonComponent {
  @Input() icon!: string;
  @Input() name!: string;
}
