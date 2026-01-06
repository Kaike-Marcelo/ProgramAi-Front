import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadialProgress } from "../../../../../../shared/components/simple-components/radial-progress/radial-progress";

@Component({
  selector: 'app-header',
  imports: [RadialProgress],
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showProgress: boolean = false;
  @Input() progressValue: number = 0;
  @Input() progressIcon: string = '';
  @Input() subtitleHtml: string = '';
  @Input() useHtmlSubtitle: boolean = false;
  @Input() titleClass: string = 'font-normal';
  @Input() subtitleClass: string = '';
  @Input() loading: boolean = false;

  @Output() backClick = new EventEmitter<void>();

  goBack() {
    this.backClick.emit();
  }
}
