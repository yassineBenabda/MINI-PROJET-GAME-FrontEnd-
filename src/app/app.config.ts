import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideKeycloakAngular } from './keycloak.config';
import { includeBearerTokenInterceptor } from 'keycloak-angular';



export const appConfig: ApplicationConfig = {
  providers: [provideKeycloakAngular(),
              provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes),
              provideHttpClient(withInterceptors([tokenInterceptor])),
              provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
              provideAnimations(), // required animations providers
              provideToastr(), // Toastr providers
            ]
};