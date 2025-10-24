// src/app/services/storage.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserData, UserModel } from '../models/user-model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getItem(key: string): UserModel | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);

      if (data) {
        return JSON.parse(data);
      }
    }
    return null;
  }

  setItem(key: string, value: UserModel) {
    const data = JSON.stringify(value);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, data);
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
