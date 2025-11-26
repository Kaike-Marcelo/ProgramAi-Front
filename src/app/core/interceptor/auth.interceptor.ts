import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = authService.getAccessToken()

  const PUBLIC_PATH_PREFIXES = [
    '/login',
    '/user'
  ];

  let pathname: string;
  try {
    pathname = new URL(req.url, window.location.origin).pathname;
  } catch {
    pathname = req.url;
  }

  const isPublic = PUBLIC_PATH_PREFIXES.some(path =>
    pathname === path || pathname.startsWith(path)
  );

  if (!token || isPublic) {
    return next(req).pipe(
      catchError(err => handleAuthError(err, authService, router))
    );
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError(err => handleAuthError(err, authService, router))
  );
};

function handleAuthError(error: any, authService: AuthenticationService, router: Router) {
  if (error instanceof HttpErrorResponse && error.status === 401) {
    authService.logout();
    router.navigate(['/sign-in']);
  }
  return throwError(() => error);
}