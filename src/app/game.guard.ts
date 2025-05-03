import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const gameGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    authService.loadToken();
    authService.decodeJWT();

    if (authService.isAdmin())
      return true;
    else {
       router.navigate(['app-forbidden']);
      return false;
    }
};
