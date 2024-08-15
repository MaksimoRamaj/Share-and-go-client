import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../page/driver/driverprofile/editprofile/profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

    isLoggedInS : WritableSignal<boolean> = signal(false);
    role = signal('');
    
    constructor(private authService : AuthService,private router: Router,private profileService : ProfileService
    ) { }

    balancee : WritableSignal<string | number> = signal('Balance');

    onHover(){
        this.balancee.set("ALL " + JSON.parse(localStorage.getItem('userprofile')!).accountBalance);
    }

    onLeave(){
        this.balancee.set('Balance');
    }


    ngOnInit(): void {
        this.authService.isAuthenticated$.subscribe({
            next: ({isAuth,role}) => {
                this.isLoggedInS.set(isAuth);
                this.role.set(role);
                console.log('Navbar:');
                console.log('Is authenticated:', isAuth);
                console.log('Role:', role); 
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
        this.profileService.activeTrips.set(false);
        this.router.navigate(["driver-profile"]);
    }

    onPassenger(){
        this.profileService.activeTrips.set(false);
        this.router.navigate(["passenger"]);
    }

    signUp(){
        this.router.navigate(['sign-up']);
    }

    balance(){
        this.router.navigate(['balance']);
    }

}
