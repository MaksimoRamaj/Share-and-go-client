import { Component, OnInit } from '@angular/core';
import { AdminResponse } from '../model/adminresponse.model';
import { Router } from '@angular/router';
import { ProfileService } from '../../page/driver/driverprofile/editprofile/profile.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user ?: AdminResponse = undefined;

  editMode = this.profileService.editMode;
  more = false;
  activeTrips = this.profileService.activeTrips;

  ngOnInit(): void {
    this.fetchAdminProfile();
  }

  fetchAdminProfile(){
    return this.http.get('http://localhost:8080/api/admin/auth-admin',{observe: 'response',responseType:'text'}).subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status === 200){
          localStorage.setItem('adminprofile',response.body);
          this.user = JSON.parse(localStorage.getItem('adminprofile') || '{}');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Status Code:', error.status); 
      },

    });
  }

  constructor(
    private router : Router, private profileService : ProfileService,private http : HttpClient
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
