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

@Component({
  selector: 'app-activetrips',
  standalone: true,
  imports: [ReviewsComponent,CommonModule,DurationPipe,CurrencyPipe,DatePipe],
  templateUrl: './activetrips.component.html',
  styleUrl: './activetrips.component.css'
})
export class ActivetripsComponent {
  items: TripResponse[] = [];
  preferences : PreferenceResponse[] = [];
  loading = false;
  page = 0;
  pageSize = 100;

  private cityService = inject(InfinitescrollserviceService);

 
  startCity !: City | null;
  endCity !: City | null;
  date !: string | null;

  show : number = -1;

  ready = this.cityService.ready$;

  isOpen = this.reviewService.isOpen;  

  constructor(private http: HttpClient,
    private router : Router,private reviewService : ReviewsService
  ) {}

  toggle(tripId : number){
    this.reviewService.isOpen.set(!this.reviewService.isOpen());
    this.reviewService.tripId.set(tripId);
  }

  ngOnInit() {
    this.ready.subscribe((value) => {
      if(value){
        this.loadMore();
      }
    });
    this.loadMore();
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
    
        this.http.get<TripResponse[]>(`http://localhost:8080/api/trip/trips-as-driver`, {observe: 'response'})
          .subscribe({
            next: (data) => {
              if(data.body){
                this.items = [...data.body];
              }else if(data.status === 204){
                console.log('No trips found');
              }
              this.loading = false;
            },
            error: (err) => {
              console.error('Error loading data', err);
              this.loading = false;
            }
          });
  }
}

