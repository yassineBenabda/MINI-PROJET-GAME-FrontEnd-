import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export function tokenInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const toExclude = '/login';
  if (!request.url.includes(toExclude)) {
    const jwt = authService.getToken();
    if (jwt) {
      const reqWithToken = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` },
      });
      return next(reqWithToken);
    }
  }
  return next(request);
}