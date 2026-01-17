import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-frame',
  imports: [],
  template: `
    <div [class]="bgClass + ' ' + borderClass"
         class="relative border-4 rounded-xl p-4 sm:p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm w-full flex flex-col md:flex-row items-center gap-4 sm:gap-8">
      <div [class]="'absolute top-1.5 left-1.5 w-2 h-2 sm:w-3 sm:h-3 ' + nailHeadsColor + ' rounded-full shadow-inner'"></div>
      <div [class]="'absolute top-1.5 right-1.5 w-2 h-2 sm:w-3 sm:h-3 ' + nailHeadsColor + ' rounded-full shadow-inner'"></div>
      <div [class]="'absolute bottom-1.5 left-1.5 w-2 h-2 sm:w-3 sm:h-3 ' + nailHeadsColor + ' rounded-full shadow-inner'"></div>
      <div [class]="'absolute bottom-1.5 right-1.5 w-2 h-2 sm:w-3 sm:h-3 ' + nailHeadsColor + ' rounded-full shadow-inner'"></div>

      <ng-content></ng-content>
    </div>
  `
})
export class GameFrame {
  @Input() bgClass: string = 'bg-neutral/90';
  @Input() nailHeadsColor: string = 'bg-neutral-content/20';
  @Input() borderClass: string = 'border-neutral';
}
