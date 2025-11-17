import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withHashLocation(),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
  ]
};
