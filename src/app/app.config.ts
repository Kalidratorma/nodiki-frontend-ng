/**
 * Global Angular application configuration.
 * Includes router, HTTP client with interceptors, animations, and optimized zone settings.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables HTTP client and registers interceptors from DI
    provideHttpClient(withInterceptorsFromDi()),

    // Registers the authentication interceptor globally
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    // Enables router with defined application routes
    provideRouter(routes),

    // Enables Angular animations support (required for ngx-graph)
    provideAnimations(),

    // Optimizes change detection
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
