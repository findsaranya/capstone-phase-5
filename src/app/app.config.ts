import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { coreProviders } from './core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...coreProviders, importProvidersFrom(HttpClientModule), provideAnimations(),provideToastr()],
};
