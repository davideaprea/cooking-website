import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userNotLoggedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  return authService.user$.pipe(
    map(res => !!res)
  );
};
