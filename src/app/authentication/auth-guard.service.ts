import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardRoleUser implements CanActivate{

  isAuthenticated : boolean = false;
  role : string = '';
  
  constructor(private authService: AuthService, private router: Router) {

    this.authService.isAuthenticated$.subscribe({
      next: ({isAuth,role}) => {
        this.isAuthenticated = isAuth;
        this.role = role;
        console.log('Is authenticated inside authguard:', isAuth);
      }
    });
     
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.isAuthenticated && this.role === 'USER') {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
