import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly tokenKey = 'programai:access_token';
  private readonly tokenRefreshKey = 'programai:refresh_token';
  private readonly userKey = 'programai:user';

  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAccessRefreshToken(): string | null {
    return localStorage.getItem(this.tokenRefreshKey);
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) as User : null;
  }

  saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
  }

  saveUserLocalStorage(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  clearTokensLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenRefreshKey);
  }

  clearUserLocalStorage(): void {
    localStorage.removeItem(this.userKey);
  }
}
