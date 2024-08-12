import { Component, inject } from '@angular/core';
import { NavbaradminComponent } from '../adminnav/navbaradmin/navbaradmin.component';
import { FooterComponent } from "../../footer/footer.component";
import { ProfileComponent } from "../profile/profile.component";
import { Router } from '@angular/router';
import { TripserviceService } from '../../page/passenger/unfilteredtrips/trip/tripservice.service';
import { HttpClient } from '@angular/common/http';
import { ReviewformService } from '../../page/passenger/ptriplist/reviewform.service';
import { TripResponse } from '../../shared/responses/tripresponse.model';
import { PreferenceResponse } from '../../shared/responses/preferenceresponse.model';
import { InfinitescrollserviceService } from '../../page/passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { City } from '../../shared/city.model';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,NavbaradminComponent, FooterComponent, ProfileComponent, DurationPipe, CurrencyPipe, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private route: Router,private tripService:TripserviceService, private http : HttpClient
    ,private reviewFormService : ReviewformService) { }

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
    
        this.http.get<TripResponse[]>(`http://localhost:8080/api/trip/trips-as-passenger`, {observe: 'response'})
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

  showReviewForm(tripId : number,driverId : number){
    
  }

}

