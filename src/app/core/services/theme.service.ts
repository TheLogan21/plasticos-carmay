import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'night' | 'corporate';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  readonly theme = signal<Theme>('night');

  init(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', this.theme());
    }
  }

  toggle(): void {
    const next: Theme = this.theme() === 'night' ? 'corporate' : 'night';
    this.theme.set(next);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', next);
    }
  }
}
