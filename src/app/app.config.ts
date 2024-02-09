import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { coreProviders } from './core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...coreProviders,importProvidersFrom(HttpClientModule)],
};
