import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  isAuthenticated : boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {

    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        console.log('Is authenticated inside authguard:', isAuthenticated);
      }
    });
     
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
