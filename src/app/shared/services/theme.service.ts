import { Injectable, signal } from '@angular/core';
import { DEFAULT_THEME } from '../../core/consts/themes';
import { ETheme } from '../../core/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly #storageKey = 'programai-theme';
  themeSignal = signal<ETheme>(this.getStoredTheme());

  constructor() {
    document.documentElement.setAttribute('data-theme', this.themeSignal());
  }

  private getStoredTheme(): ETheme {
    const stored = localStorage.getItem(this.#storageKey);

    if (stored && Object.values(ETheme).includes(stored as ETheme)) {
      return stored as ETheme;
    }
    return DEFAULT_THEME;
  }

  setTheme(theme: ETheme): void {
    this.themeSignal.set(theme);
    localStorage.setItem(this.#storageKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getTheme(): string {
    return this.themeSignal();
  }
}
