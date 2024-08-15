import { Component } from '@angular/core';
import { AdminResponse } from '../model/adminresponse.model';
import { Router } from '@angular/router';
import { ProfileService } from '../../page/driver/driverprofile/editprofile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user : AdminResponse = JSON.parse(localStorage.getItem('adminprofile')!);

  editMode = this.profileService.editMode;
  more = false;
  activeTrips = this.profileService.activeTrips;

  constructor(
    private router : Router, private profileService : ProfileService
  ) { } 

  toggleMore(){
      this.more = !this.more;
  }

  toggleActiveTrips(){
      this.activeTrips.set(!this.activeTrips());
  }

  onVeturat(){
      this.router.navigate(['driver-profile/veturat']);
  }

  editProfile(){
      this.profileService.toggleEditMode();
  }

  shfaqUdhetimetAktive(){
      this.toggleActiveTrips();
      this.router.navigate(['driver-profile/udhetimet-aktive']);
  }

  shfaqUdhetimet(){
      this.toggleActiveTrips();
      this.router.navigate(['driver-profile']);
  }
}
