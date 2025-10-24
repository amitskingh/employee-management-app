import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    const role = authService.getUserRole();
    const allowedRoles = route.data['role'] as string[];

    if (allowedRoles.includes(role)) {
      return true;
    }
  }

  return false;
};
