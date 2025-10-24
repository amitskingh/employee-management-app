import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel, UserData } from '../models/user-model';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/auth/login/';
  private storageService = inject(StorageService);

  isLoggedIn() {
    const data = this.storageService.getItem('token');

    if (data) {
      return true;
    }
    return false;
  }

  getUserRole(): string {
    const data = this.storageService.getItem('token');
    return data?.role as string;
  }

  setUserData(data: UserModel) {
    this.storageService.setItem('token', data);
  }

  logoutUser() {
    this.storageService.removeItem('token');
  }

  loginUser(data: UserData) {
    return this.http.post<UserModel>(`${this.baseUrl}`, data);
  }
}
