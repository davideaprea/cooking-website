import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userNotLoggedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.user$.pipe(
    map(res => {
      if(!res) router.navigate(["/auth", "login"]);
      return !!res;
    })
  );
};
