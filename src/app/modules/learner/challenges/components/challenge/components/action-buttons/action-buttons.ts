import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.html',
})
export class ActionButtons {
  @Input() code: string = '';
  @Input() loading: boolean = false;
  @Input() question: any;

  @Output() hintClick = new EventEmitter<void>();
  @Output() submitClick = new EventEmitter<void>();
  @Output() feedbackClick = new EventEmitter<void>();

  getHintButtonText(): string {
    return this.question?.attempt?.aiHint
      ? 'MOSTRAR DICA'
      : 'QUERO UMA DICA';
  }
}
