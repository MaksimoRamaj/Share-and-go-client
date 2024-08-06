import { Component, OnInit, signal } from '@angular/core';
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

    isLoggedInS = this.authService.isLoggedInS;
    
    constructor(private authService : AuthService,private router: Router
    ) { }


    ngOnInit(): void {
    }

    logOut() {
        console.log("Logging out");
        this.authService.logout();
        this.router.navigate(['']);
        this.isLoggedInS.set(false);
        console.log(this.authService.isLoggedIn());
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

}
