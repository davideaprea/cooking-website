import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';

export const roleGuardGuard = (role: Role): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    return authService.user$.pipe(
      map(user => user?.role == role)
    );
  }
};
