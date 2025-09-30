import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule,],
  templateUrl: './primary-button.component.html'
})
export class PrimaryButtonComponent {

  @Input() textButton: string = 'Texto';
  @Input() icon?: string;
  @Input({ required: true }) r_loading!: Signal<boolean>;
}
