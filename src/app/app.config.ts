/**
 * Global Angular application configuration.
 * Includes router, HTTP client with interceptors, and optimized zone settings.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables HTTP client and registers interceptors from DI
    provideHttpClient(withInterceptorsFromDi()),

    // Enables router with defined application routes
    provideRouter(routes),

    // Optimizes change detection performance
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
