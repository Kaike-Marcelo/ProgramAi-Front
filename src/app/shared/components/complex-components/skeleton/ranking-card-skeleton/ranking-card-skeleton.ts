import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-card-skeleton',
  imports: [],
  template: `
  <div [class]="'mx-auto w-full rounded-lg  p-4' + border">
    <div class="flex animate-pulse space-x-4">
      <div class="flex-1 space-y-3 py-1">
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
})
export class RankingCardSkeleton {
  @Input() border: string = '';
}
