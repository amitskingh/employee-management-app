import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const isLoggedIn = !!storageService.getItem('token');
  if (isLoggedIn) {
    router.navigate(['/employee-list']);
    return false;
  }
  return true;
};
