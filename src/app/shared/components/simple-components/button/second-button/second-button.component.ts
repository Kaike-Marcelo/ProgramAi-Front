import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second-button',
  imports: [CommonModule],
  templateUrl: './second-button.component.html'
})
export class SecondButtonComponent {
  @Input() textButton: string = 'Texto';
  @Input() icon?: string;
  @Input() class: string = 'btn-primary';
}
