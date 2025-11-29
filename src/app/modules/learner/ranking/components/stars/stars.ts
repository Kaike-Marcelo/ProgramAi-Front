import { Component, Input } from '@angular/core';
import { StarsInterface } from '../ranking-card/types/ranking-card.types';

@Component({
  selector: 'app-stars',
  imports: [],
  template: `
  <div [class]="'flex items-center ' + justify + ' gap-0.5 text-sm sm:text-xl'">
      @for(star of getStarsArray(totalNumberOfStars); track $index) {
      <i [class]="'ph'+ (styleStars?.fill ? '-fill' : '') + ' ph-star ' + 
                        (($index < (numberStarActivated || 0)) 
                        ? styleStars?.colorActivated 
                        : styleStars?.colorDisabled)"></i>
      }
  </div>
  `,
})
export class Stars {
  @Input() totalNumberOfStars: number = 5;
  @Input() styleStars: StarsInterface | null = null;
  @Input() numberStarActivated: number = 0;
  @Input() justify: 'justify-start' | 'justify-center' | 'justify-end' = 'justify-center';

  getStarsArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
