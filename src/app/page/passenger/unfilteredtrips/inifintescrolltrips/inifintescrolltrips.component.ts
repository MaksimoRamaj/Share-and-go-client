import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TripResponse } from '../../../../shared/responses/tripresponse.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { InfinitescrollserviceService } from './infinitescrollservice.service';
import { City } from '../../../../shared/city.model';
import { MyInterceptor } from '../../../../services/my-interceptor.service';
import { TripService } from '../../../driver/driverprofile/tripdetails/trip.service';
import { TripserviceService } from '../trip/tripservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inifintescrolltrips',
  standalone: true,
  imports: [CommonModule,DurationPipe],
  templateUrl: './inifintescrolltrips.component.html',
  styleUrls: ['./inifintescrolltrips.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ]
})
export class InifintescrolltripsComponent implements OnInit {
  
  items: TripResponse[] = [];
  loading = false;
  page = 0;
  pageSize = 100;

  private cityService = inject(InfinitescrollserviceService);

  startCityObs = this.cityService.startCity$;  
  endCityObs = this.cityService.endCity$;
  dateObs = this.cityService.date$;

  startCity !: City | null;
  endCity !: City | null;
  date !: string | null;

  ready = this.cityService.ready$;

  constructor(private http: HttpClient,private tripService : TripserviceService,
    private router : Router
  ) {}

  ngOnInit() {
    this.startCityObs.subscribe((city) => {
      this.startCity = city;
    });
    this.endCityObs.subscribe((city) => {
     this.endCity = city;
    });
    this.dateObs.subscribe((date) => {
      this.date = date;
    });
    this.ready.subscribe((value) => {
      if(value){
        this.loadMore();
      }
    });
    this.loadMore();
  }

  showMore(tripId : number){
      this.tripService.selectedTripId.set(tripId);
      this.router.navigate(['reserve-trip/'+tripId]); 
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
    console.log(this.startCity);
    console.log(this.endCity);
    if(this.startCity?.name !== '' && this.endCity?.name !=='' && this.date!==''){
      console.log('filtered');
      this.http.get<TripResponse[]>(`http://localhost:8080/api/trip/filtered-trips?page=${this.page}&size=${this.pageSize}&startCity=${this.startCity?.name}&endCity=${this.endCity?.name}&date=${this.date}`)
      .subscribe({
        next: (data) => {
          this.items =  [...data];
          // if(data.length === 0){
          //   this.page = 0;
          // }
          // this.page++;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading data', err);
          this.loading = false;
        }
      });
    }else{
        this.http.get<TripResponse[]>(`http://localhost:8080/api/trip/all-trips?page=${this.page}&size=${this.pageSize}`)
          .subscribe({
            next: (data) => {
              this.items = [...data];
              // if(data.length === 0){
              //   this.page = -1;
              // }
              // this.page++;
              this.loading = false;
            },
            error: (err) => {
              console.error('Error loading data', err);
              this.loading = false;
            }
          });
  }
}
}
