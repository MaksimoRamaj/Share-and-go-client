import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  isLoggedInS = signal(false);

  constructor() {}

  login() {
    this.isAuthenticated = true;
    this.isLoggedInS.set(true);
  }

  logout() {
    this.isAuthenticated = false;
    this.isLoggedInS.set(false);
    localStorage.removeItem('loginToken');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
