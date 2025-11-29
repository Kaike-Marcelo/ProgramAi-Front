import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export const authGuard = () : CanActivateFn => {
  return () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    if (authService.isUserAuthenticated()) {
      return true
    }

    return router.parseUrl('sign-in');
  }
};
