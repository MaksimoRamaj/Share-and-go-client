import { Component } from '@angular/core';
import { UserProfile } from '../../../../shared/userprofile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
    
    user : UserProfile = {
        firstName: "John",
        lastName: "Doe",
        email: "JohnDoe@gmail.com",
    }

    constructor(
      private router : Router
    ) { } 

    onVeturat(){
        this.router.navigate(['driver-profile/veturat']);
    }
}
