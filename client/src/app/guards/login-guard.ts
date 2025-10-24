import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { AuthService } from '../services/auth-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = !!authService.isLoggedIn();
  if (isLoggedIn) {
    router.navigate(['/employees']);
    return false;
  }
  return true;
};
