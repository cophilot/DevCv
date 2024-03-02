import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  static isUserCached(user: string, secure: boolean): boolean {
    if (secure) {
      return sessionStorage.getItem(`${user}-secure-cache`) != null;
    }
    return sessionStorage.getItem(`${user}-cache`) != null;
  }

  static cachePassword(user: string, pw: string) {
    if (sessionStorage.length > 10) {
      sessionStorage.clear();
    }
    sessionStorage.setItem(`${user}-secure-pw`, pw);
  }

  static cacheUser(user: string, data: string, secure: boolean) {
    if (sessionStorage.length > 10) {
      sessionStorage.clear();
    }
    if (secure) {
      sessionStorage.setItem(`${user}-secure-cache`, data);
      return;
    }
    sessionStorage.setItem(`${user}-cache`, data);
  }

  static deleteUser(user: string) {
    sessionStorage.removeItem(`${user}-cache`);
  }
  static getData(user: string, secure: boolean): string | null {
    if (secure) {
      return sessionStorage.getItem(`${user}-secure-cache`);
    }
    return sessionStorage.getItem(`${user}-cache`);
  }

  static getPassword(user: string): string | null {
    return sessionStorage.getItem(`${user}-secure-pw`);
  }
}
