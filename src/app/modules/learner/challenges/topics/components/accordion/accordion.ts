import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TopicsModule } from '../../../../../../core/models/challengs.model';
import { DurationFormatPipe } from '../../../../../../shared/pipes/duration-format-pipe';

@Component({
  selector: 'app-accordion',
  imports: [DurationFormatPipe],
  templateUrl: './accordion.html',
})
export class Accordion {
  @Input() data: TopicsModule | null = null;
  @Output() topicClick = new EventEmitter<number>();

  onAccordionClick() {
    if (this.data && !this.data.hasQuestions) {
      this.topicClick.emit(this.data.topicId);
    }
  }
}
