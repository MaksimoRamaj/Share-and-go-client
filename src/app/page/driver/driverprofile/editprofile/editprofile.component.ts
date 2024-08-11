import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileUpdateRequest } from '../../../../shared/requests/profileupdaterequest.model';
import { UserProfile } from '../../../../shared/userprofile.model';
import { userprofile } from '../../../../shared/responses/userresponse.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth-service.service';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {

  profileRequest : ProfileUpdateRequest = {};
  userprofile : userprofile = {};

  constructor(private profileService : ProfileService,private http: HttpClient, private authService: AuthService, private router: Router) {  

  }

  editMode = this.profileService.editMode;  

  toggleEditMode(){
    this.profileService.toggleEditMode();
  }

  ngOnInit(): void {

    this.userprofile = JSON.parse(localStorage.getItem('userprofile')!);

    this.profileRequest = {
      phoneNumber : this.userprofile.phoneNumber,
      firstname : this.userprofile.profile?.firstname,
      lastname : this.userprofile.profile?.lastname,
      birthDate : this.userprofile.profile?.birthDate
    }

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.profileRequest.newProfilePicture = file;
    }
  }

  updateProfile(){

    const formData = new FormData();

    formData.append('phoneNumber', this.profileRequest.phoneNumber!);
    formData.append('firstname', this.profileRequest.firstname!);
    formData.append('lastname', this.profileRequest.lastname!);
    formData.append('birthDate', this.profileRequest.birthDate!);
    
    if(this.profileRequest.newProfilePicture){
      formData.append('newProfilePicture', this.profileRequest.newProfilePicture);
    }
    if(this.profileRequest.oldPassword){
      formData.append('oldPassword', this.profileRequest.oldPassword);
      formData.append('newPassword', this.profileRequest.newPassword!);
      formData.append('newConfirmPassword', this.profileRequest.newConfirmPassword!);
    }


    this.http.put('http://localhost:8080/api/user/update-profile', formData , {observe : 'response'}).subscribe(
      {
        next: (response) => {
          if(response.status == 200){
              alert("Profile Updated Successfully");
              this.toggleEditMode();
              this.authService.logout();
               this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      }
    )

  }



}
