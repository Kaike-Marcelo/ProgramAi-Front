import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConsoleMessage } from './console-output-types';

@Component({
  selector: 'app-console-output',
  imports: [],
  templateUrl: './console-output.html',
  styleUrl: './console-output.scss',
})
export class ConsoleOutput implements OnChanges {
  @Input() messages: ConsoleMessage[] = [];
  @Input() title: string = 'Console';
  @Input() maxMessages: number = 100;
  @Input() autoScroll: boolean = true;

  @Output() clear = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && this.autoScroll) {
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  clearConsole(): void {
    this.clear.emit();
  }

 getMessageClass(type: ConsoleMessage['type']): string {
    const classes: Record<ConsoleMessage['type'], string> = {
      'stdout': 'text-gray-200',
      'stderr': 'text-error/80',
      'error': 'text-error font-semibold',
      'info': 'text-warning',
      'command': 'text-success'
    };
    return classes[type];
  }

  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  private scrollToBottom(): void {
    const consoleElement = document.querySelector('.console-content');
    if (consoleElement) {
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }
  }
}
