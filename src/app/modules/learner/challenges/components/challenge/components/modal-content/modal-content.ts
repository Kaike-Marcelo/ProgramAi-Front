import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  imports: [],
  template: `
   <div class="prose prose-invert max-w-none" [class]="contentClass">
      @if (isLoading) {
        <div class="flex items-center justify-center h-32">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      } @else {
        <p class="whitespace-pre-line">{{ content }}</p>
      }
    </div>
  `
})
export class ModalContent {
  @Input() content: string = '';
  @Input() isLoading: boolean = false;
  @Input() contentClass: string = '';
}
