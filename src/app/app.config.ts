import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService, coreProviders } from './core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...coreProviders],
};
