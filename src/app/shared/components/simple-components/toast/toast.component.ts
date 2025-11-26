import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { timer } from 'rxjs';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  message = signal('');
  type = signal<'info' | 'success' | 'warning' | 'error'>('info');
  visible = signal(false);

  constructor(private snackbar: SnackbarService) {
    this.snackbar.toast$.subscribe((toast) => {
      if (toast) {
        this.message.set(toast.message);
        this.type.set(toast.type);
        this.visible.set(true);
        timer(3000).subscribe(() => this.visible.set(false));
      }
    });
  }


  alertClass = computed(() => `alert alert-${this.type()} alert-soft`);
}
