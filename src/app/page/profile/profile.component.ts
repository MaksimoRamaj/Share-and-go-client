import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { userprofile } from '../../shared/responses/userresponse.model';
import { SweetAlertService } from '../../../sweet-alert/sweet-alert-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usrprofile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private profileService : ProfileService,private swal : SweetAlertService) {}

  userProfile : userprofile | null = null;

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      {
        next: (response) => {
          if(response.status === 200 && response.body){
          this.userProfile = JSON.parse(response.body);
          }
        },
        error: (error) => {
          this.swal.failNotification("Error",error.error);
        }
      }
    );
  }

  showProfile(val : boolean){ 
    this.profileService.showProfile.set(val);
  }

}
