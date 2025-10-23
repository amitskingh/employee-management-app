import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage-service';

type userDetailType = {
  email: string;
  password: string;
};

export const userDetail: userDetailType = {
  email: 'harvey@gmail.com',
  password: 'harvey$123',
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const token = storageService.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
