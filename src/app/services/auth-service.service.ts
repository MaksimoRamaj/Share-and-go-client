import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   isAuthenticated = new BehaviorSubject<boolean>(this.isAuth());
   isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {}

  login(token : string) {
        localStorage.setItem('loginToken', token);
        this.isAuthenticated.next(true);
  }

  logout() {
        localStorage.removeItem('loginToken');
        this.isAuthenticated.next(false);
  }

  isAuth() {
    if(localStorage.getItem('loginToken') !== null){
      return true;
    }
    return false;
  }

}


