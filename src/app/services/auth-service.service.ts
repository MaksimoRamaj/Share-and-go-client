import { Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   isAuthenticated = new BehaviorSubject<{isAuth : boolean,role : string}>
   ({isAuth : this.isAuth(),role : this.getRole()});
   isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {}

  login(token : string, role : string) {
        localStorage.setItem('loginToken', token);
        this.isAuthenticated.next({isAuth: true, role: role});
  }

  logout() {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('userprofile');
        localStorage.removeItem('adminprofile');
        this.isAuthenticated.next({isAuth: false, role: ''});
  }

  isAuth() {
    if(localStorage.getItem('loginToken') !== null){
      return true;
    }
    return false;
  }

  getRole(){
     let role : string | null = localStorage.getItem('role');
     if(role){
      return role;
     }
     return '';
  }

}


