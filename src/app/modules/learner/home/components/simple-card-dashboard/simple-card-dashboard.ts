import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-card-dashboard',
  imports: [],
  template: `
    <div class="h-full flex flex-col bg-base-300 p-4 rounded-lg justify-between">
        <p class="text-base-content/70 text-xs sm:text-md">{{ title }}</p>
        <div class="flex flex-row justify-between items-center w-full gap-2">
            <p class="text-primary font-semibold text-xl sm:text-3xl">{{ value }}</p>
            <p class="bg-primary text-secondary py-1 px-2 rounded-lg text-xs sm:text-sm">{{ percentage }}%</p>
        </div>
    </div>
  `,
})
export class SimpleCardDashboard {
  @Input() title: string = '--';
  @Input() value: number = 0;
  @Input() percentage: number = 0;
}
