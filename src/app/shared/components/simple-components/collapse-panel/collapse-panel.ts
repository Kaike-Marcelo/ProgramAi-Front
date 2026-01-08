import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collapse-panel',
  imports: [],
  templateUrl: './collapse-panel.html',
})
export class CollapsePanel {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() icon: string = '';
  @Input() id: number | null = null;

  @Input() contentColor: string = 'text-base-100';
  @Input() bgColor: string = 'bg-primary';

  @Output() clicked = new EventEmitter<number>();

  onClick() {
    this.clicked.emit(this.id || 0);
  }
}
