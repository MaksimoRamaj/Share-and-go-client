import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-navbaradmin',
  standalone: true,
  imports: [],
  templateUrl: './navbaradmin.component.html',
  styleUrl: './navbaradmin.component.css'
})
export class NavbaradminComponent implements OnInit{

    isLoggedInS : WritableSignal<boolean> = signal(false);
    role = signal('');
    
    constructor(private authService : AuthService,private router: Router,private adminService : AdminService
    ) { }

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

    toggle(val : boolean){
        this.adminService.reports.set(val);
    }

}