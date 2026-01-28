import { Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  isMobile = signal(false);

  constructor(private observer: BreakpointObserver) {
    this.observer.observe([Breakpoints.Handset])
      .subscribe(result => this.isMobile.set(result.matches));
  }
}
