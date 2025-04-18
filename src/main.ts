/**
 * Angular application bootstrap file.
 * Uses standalone AppComponent and centralized app configuration.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Bootstraps the standalone application using the global configuration.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
