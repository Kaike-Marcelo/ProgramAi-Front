import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../../../../shared/services/device.service';
import { ThemeService } from '../../../../shared/services/theme.service';
import { DEFAULT_THEME } from '../../../../core/consts/themes';

@Component({
  selector: 'app-user-access-container',
  imports: [],
  templateUrl: './user-access-container.html'
})
export class UserAccessContainer implements OnInit, OnDestroy {
  protected deviceService = inject(DeviceService)
  #themeService = inject(ThemeService);

  private cdr = inject(ChangeDetectorRef);

  @Input() images?: string[] | null;
  @Input() imagePosition: 'left' | 'right' = 'left';

  defaultImages = [
    'assets/images/user-access/image01.jpg',
    'assets/images/user-access/image02.jpg',
    'assets/images/user-access/image03.jpg',
    'assets/images/user-access/image04.jpg',
    'assets/images/user-access/image05.jpg',
  ];

  currentIndex = 0;
  currentImage = '';

  private intervalId?: any;

  ngOnInit() {
    const imagesToUse = this.images || this.defaultImages;
    this.currentImage = imagesToUse[0];

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % imagesToUse.length;
      this.currentImage = imagesToUse[this.currentIndex];
      this.cdr.detectChanges();
    }, 8000);

    this.#themeService.setTheme(DEFAULT_THEME);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
