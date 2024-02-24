import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  static cacheUser(user: string, data: string) {
    if (sessionStorage.length > 10) {
      sessionStorage.clear();
    }
    sessionStorage.setItem(`${user}-cache`, data);
  }

  static deleteUser(user: string) {
    sessionStorage.removeItem(`${user}-cache`);
  }
  static getData(user: string): string | null {
    return sessionStorage.getItem(`${user}-cache`);
  }
}
