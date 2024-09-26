import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { MyInterceptor } from './services/my-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeSq from '@angular/common/locales/sq';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeSq);


export const appConfig: ApplicationConfig = {
  providers: [ { provide: LOCALE_ID, useValue: 'sq' },
    provideRouter(
      routes,
      withViewTransitions()
    ),
    provideHttpClient(
    withInterceptors([tokenInterceptorInterceptor])
  ), provideAnimationsAsync(),
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },}
  ),)
  ]
};
