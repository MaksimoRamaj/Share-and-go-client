import { Component, OnInit, signal } from '@angular/core';
import { OfferDriveFormComponent } from '../../forms/offer-drive-form/offer-drive-form.component';
import { RouterOutlet } from '@angular/router';
import { FindTripFormComponent } from '../../forms/find-trip-form/find-trip-form.component';
import { CardsComponent } from '../../cards/cards.component';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbars/navbar/navbar.component';
import { MapComponent } from '../../map/map.component';
import { AuthService } from '../../services/auth-service.service';
import { UnfilteredtripsComponent } from "../passenger/unfilteredtrips/unfilteredtrips.component";
import { InifintescrolltripsComponent } from "../passenger/unfilteredtrips/inifintescrolltrips/inifintescrolltrips.component";
import { InfinitescrollserviceService } from '../passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { userprofile } from '../../shared/responses/userresponse.model';
import { profile } from '../../shared/responses/profileresponse';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [OfferDriveFormComponent, RouterOutlet, FindTripFormComponent, CardsComponent,
    FooterComponent, NavbarComponent, MapComponent, UnfilteredtripsComponent, InifintescrolltripsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

    isLoggegIn = signal(false);
    
    
    constructor(private authService : AuthService,private infintescrollserviceService : InfinitescrollserviceService, private http : HttpClient) { 
        
    }

    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe({
        next: ({isAuth,role}) => {
          this.isLoggegIn.set(isAuth);
          console.log('Is authenticated:', isAuth);
          if(isAuth && role === 'USER'){
            console.log('Fetching userprofile');
            this.fetchUserProfile();
          }else if(isAuth && role === 'ADMIN'){
            console.log('Fetching driverprofile');
            this.fetchAdminProfile();
          }
        }
      });
    }

    fetchUserProfile(){
      this.http.get('http://localhost:8080/api/user/auth-user',{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 200){
            localStorage.setItem('userprofile',JSON.stringify(response.body));
            this.fetchUserStats(response.body);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Status Code:', error.status);  // Accessing the status code in case of error
        },

      });
    }

    fetchUserStats(userprofile : userprofile){
      this.http.get('http://localhost:8080/api/user/stats',{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 200){
            let profile : {
              userId: number,
              tripsOffered: number,       // Replace with actual trips offered
              tripsReceived: number,       // Replace with actual trips received
              packagesDelivered: number,   // Replace with actual packages delivered
              packagesSent: number       // Replace with actual packages sent
          } = response.body;
          console.log('response:',response.body);
          console.log('User profile:',userprofile);
          console.log('User stats:',profile);

            userprofile.profile!.tripsOffered = profile.tripsOffered;
            userprofile.profile!.tripsReceived = profile.tripsReceived;
            userprofile.profile!.packagesDelivered = profile.packagesDelivered;
            userprofile.profile!.packagesSent = profile.packagesSent;

            localStorage.setItem('userprofile',JSON.stringify(userprofile));
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Status Code:', error.status);  // Accessing the status code in case of error
        },

      });
    }

    fetchAdminProfile(){
      return this.http.get('http://localhost:8080/api/admin/auth-admin',{observe: 'response',responseType:'text'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 200){
            localStorage.setItem('adminprofile',JSON.stringify(response.body));
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Status Code:', error.status); 
        },

      });
    }

    
}
