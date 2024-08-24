import { Component, inject } from '@angular/core';
import { TripResponse } from '../../../../../shared/responses/tripresponse.model';
import { PreferenceResponse } from '../../../../../shared/responses/preferenceresponse.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { City } from '../../../../../shared/city.model';
import { InfinitescrollserviceService } from '../../../../passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { ReviewsComponent } from "../reviews/reviews.component";
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../../../../shared/pipes/duration.pipe';
import { ActivetripsService } from './activetrips.service';
import { JointriprequestsComponent } from "./jointriprequests/jointriprequests.component";
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../../../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-activetrips',
  standalone: true,
  imports: [ReviewsComponent, CommonModule, DurationPipe, CurrencyPipe, DatePipe, JointriprequestsComponent],
  templateUrl: './activetrips.component.html',
  styleUrl: './activetrips.component.css'
})
export class ActivetripsComponent {
  
  trips: TripResponse[] = [];
  preferences : PreferenceResponse[] = [];
  loading = false;
  page = 0;
  pageSize = 100;

  show : number = -1;

  isOpen = this.activeTripsService.openRequests;  

  constructor(private http: HttpClient,
    private router : Router,private reviewService : ReviewsService,
    private activeTripsService : ActivetripsService,
    private swal : SweetAlertService
  ) {}

  ngOnInit() {
    this.http.get<TripResponse[]>('http://localhost:8080/api/trip/active-trips-as-driver',
      {observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.trips = response.body;
            }
          }else if(response.status === 204){
            console.log('No trips found!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.loadMore();
  }

  showApplications(tripId : number,availableSeats : number){
    this.activeTripsService.openRequests.set(true);
    this.activeTripsService.openTripApplications(tripId,availableSeats);
  }

  showMore(tripId : number){
      this.show = tripId;
      this.http.get<PreferenceResponse[]>('http://localhost:8080/api/preference/preferences-by-trip-id?id='+tripId,
      {observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.preferences = response.body;
            }
          }else if(response.status === 204){
            console.log('No preferences found for this trip');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  perfundo(tripId : number){
      this.http.put('http://localhost:8080/api/trip/finish-trip',null,{observe: 'response',responseType: 'text'},).subscribe({
        next: (response) => {
          if(response.status === 200){
            this.swal.successNotification("Sukses!",'Udhetimi perfundoi me sukses!');
            this.trips = this.trips.filter(trip => trip.id !== tripId);
          }
          if(response.status === 404){
            this.swal.failNotification("Gabim!",'Udhetimi nuk ka filluar akoma!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  anullo(tripId : number){
    this.http.put('http://localhost:8080/api/trip/cancel-trip?id='+tripId,null,{observe: 'response',responseType: 'text'}).subscribe({
      next: (response) => {
        if(response.status === 200){
          this.swal.successNotification("Sukses!",'Trip cancelled successfully!');
          this.trips = this.trips.filter(trip => trip.id !== tripId);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

  }


  showLess(){
    this.show = -1;
  }

  onScroll() {
    const container = document.querySelector('.container');
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        this.loadMore();
      }
    }
  }

  loadMore() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.http.get<TripResponse[]>('http://localhost:8080/api/trip/active-trips-as-driver',
      {observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.trips = response.body;
            }
          }else if(response.status === 204){
            console.log('No trips found!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  
  }
}

