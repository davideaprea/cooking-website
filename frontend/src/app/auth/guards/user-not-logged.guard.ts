import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userNotLoggedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).user$.pipe(
    map(res => {
      if(!res) inject(Router).navigate(["/auth", "login"]);
      return !!res;
    })
  );
};
