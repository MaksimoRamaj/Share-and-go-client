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
        next: (isAuthenticated: boolean) => {
          this.isLoggegIn.set(isAuthenticated);
          console.log('Is authenticated:', isAuthenticated);
          if(isAuthenticated){
            console.log('Fetching userprofile');
            this.fetchUserProfile();
          }
        }
      });
    }

    fetchUserProfile(){
      this.http.get('http://localhost:8080/api/user/auth-user',{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 200){
            localStorage.setItem('userprofile',JSON.stringify(response.body));
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Status Code:', error.status);  // Accessing the status code in case of error
        },

      });
    }

    
}
