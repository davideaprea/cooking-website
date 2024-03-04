import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userLoggedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).user$.pipe(
    map(res =>  !res)
  );
};
