import { Component } from '@angular/core';
import { UserProfile } from '../../../../shared/userprofile.model';
import { Router } from '@angular/router';
import { EditprofileComponent } from "../editprofile/editprofile.component";
import { ProfileService } from '../editprofile/profile.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [EditprofileComponent],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
    
    user : UserProfile = {
        firstName: "John",
        lastName: "Doe",
        email: "JohnDoe@gmail.com",
    }

    editMode = this.profileService.editMode;

    constructor(
      private router : Router, private profileService : ProfileService
    ) { } 

    onVeturat(){
        this.router.navigate(['driver-profile/veturat']);
    }

    editProfile(){
        this.profileService.toggleEditMode();
    }
}
