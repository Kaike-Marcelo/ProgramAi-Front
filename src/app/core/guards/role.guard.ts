import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export const hasRoleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const user = authService.getLoggedInUser();

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    authService.logout();
    return router.parseUrl('/sign-in');
  }
};
