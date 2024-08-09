import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

    isLoggedInS : WritableSignal<boolean> = signal(false);
    
    constructor(private authService : AuthService,private router: Router
    ) { }


    ngOnInit(): void {
        this.authService.isAuthenticated$.subscribe({
            next: (isAuthenticated: boolean) => {
                this.isLoggedInS.set(isAuthenticated);
            }
        });
    }

    logOut() {
        console.log("Logging out");
        this.authService.logout();
        this.router.navigate(['']);
    } 

    logIn() {
        this.router.navigate(['login']);
    }

    onDriver(){
        this.router.navigate(["driver-profile"]);
    }

    onPassenger(){
        this.router.navigate(["passenger"]);
    }

    signUp(){
        this.router.navigate(['sign-up']);
    }

    balance(){
        this.router.navigate(['balance']);
    }

}
