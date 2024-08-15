import { Component } from '@angular/core';
import { TripResponse } from '../../../shared/responses/tripresponse.model';
import { PreferenceResponse } from '../../../shared/responses/preferenceresponse.model';
import { HttpClient } from '@angular/common/http';
import { ReviewsService } from '../../driver/driverprofile/triplist/reviews.service';
import { ActivetripsService } from '../../driver/driverprofile/triplist/activetrips/activetrips.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { JointriprequestsComponent } from './jointriprequests/jointriprequests.component';
import { TripApplicationResponse } from '../../../shared/responses/tripapplicationresponse.model';

@Component({
  selector: 'app-activetrips',
  standalone: true,
  imports: [CommonModule, DurationPipe, CurrencyPipe, DatePipe, JointriprequestsComponent],
  templateUrl: './activetrips.component.html',
  styleUrl: './activetrips.component.css'
})
export class ActivepassengerTripsComponent {
  trips: TripResponse[] = [];
  preferences : PreferenceResponse[] = [];
  tripApplicationResponses : TripApplicationResponse[] = []; 
  loading = false;
  page = 0;
  pageSize = 100;

  show : number = -1;

  isOpen = this.activeTripsService.openRequests;  

  constructor(private http: HttpClient,
    private router : Router,private reviewService : ReviewsService,
    private activeTripsService : ActivetripsService
  ) {}

  ngOnInit() {
    this.http.get<TripResponse[]>('http://localhost:8080/api/trip/active-trips-as-passenger',
      {observe: 'response'}).subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.trips = response.body;
              console.log(this.trips);
            }
          }else if(response.status === 204){
            console.log('No trips found!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.http.get<TripApplicationResponse[]>
      (`http://localhost:8080/api/trip-application/for-passenger-by-trip-id`,{observe: 'response'})
      .subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.tripApplicationResponses = response.body;
              console.log(this.tripApplicationResponses);
            }
          }else if(response.status === 204){
            console.log('No requests found!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  findApplicatioResponse(tripId : number):TripApplicationResponse{
      return this.tripApplicationResponses.find(x => x.tripId === tripId)!;
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

    this.http.get<TripResponse[]>('http://localhost:8080/api/trip/active-trips-as-passenger',
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