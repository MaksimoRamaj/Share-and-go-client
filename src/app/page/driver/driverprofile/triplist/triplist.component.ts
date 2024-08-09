import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Trip } from '../../../../shared/trip.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookingType } from '../../../../shared/bookingtype.model';
import { TripService } from '../tripdetails/trip.service';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TripResponse } from '../../../../shared/responses/tripresponse.model';
import { InfinitescrollserviceService } from '../../../passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { City } from '../../../../shared/city.model';
import { HttpClient } from '@angular/common/http';
import { TripserviceService } from '../../../passenger/unfilteredtrips/trip/tripservice.service';

@Component({
  selector: 'app-triplist',
  standalone: true,
  imports: [RouterModule , DurationPipe, CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css'
})
export class TriplistComponent {

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

  show : number = -1;

  ready = this.cityService.ready$;

  constructor(private http: HttpClient,
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
      this.show = tripId;
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

