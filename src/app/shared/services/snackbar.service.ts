import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export interface ToastData {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toast$ = this.toastSubject.asObservable();

  showInfo(message: string) {
    this.toastSubject.next({ message, type: 'info' });
  }

  showSuccess(message: string) {
    this.toastSubject.next({ message, type: 'success' });
  }

  showWarning(message: string) {
    this.toastSubject.next({ message, type: 'warning' });
  }

  showError(message: string) {
    this.toastSubject.next({ message, type: 'error' });
  }
}
