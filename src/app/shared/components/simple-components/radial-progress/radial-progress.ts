import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radial-progress',
  imports: [],
  templateUrl: './radial-progress.html',
})
export class RadialProgress implements OnChanges {
  @Input() totalProgress: number = 0;
  @Input() icon: string = '';
  progress: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalProgress']) this.animateProgress();
  }

  animateProgress() {
    this.progress = 0;
    const step = 1;
    const interval = setInterval(() => {
      if (this.progress < this.totalProgress) {
        this.progress += step;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
}
