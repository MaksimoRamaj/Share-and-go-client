import { Component } from '@angular/core';
import { UserProfile } from '../../../../shared/userprofile.model';
import { Router } from '@angular/router';
import { EditprofileComponent } from "../editprofile/editprofile.component";
import { ProfileService } from '../editprofile/profile.service';
import { userprofile } from '../../../../shared/responses/userresponse.model';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [EditprofileComponent],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
    
    user : userprofile = JSON.parse(localStorage.getItem('userprofile')!);

    editMode = this.profileService.editMode;
    more = false;

    constructor(
      private router : Router, private profileService : ProfileService
    ) { } 

    toggleMore(){
        this.more = !this.more;
    }

    onVeturat(){
        this.router.navigate(['driver-profile/veturat']);
    }

    editProfile(){
        this.profileService.toggleEditMode();
    }
}
