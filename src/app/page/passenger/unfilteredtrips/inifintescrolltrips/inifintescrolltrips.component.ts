import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripResponse } from '../../../../shared/responses/tripresponse.model';
import { InfinitescrollserviceService } from './infinitescrollservice.service';
import { City } from '../../../../shared/city.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-inifintescrolltrips',
  standalone: true,
  templateUrl: './inifintescrolltrips.component.html',
  styleUrls: ['./inifintescrolltrips.component.css'],
  imports:[DurationPipe,CurrencyPipe,DatePipe,CommonModule]
})
export class InifintescrolltripsComponent implements OnInit {
  
  items: TripResponse[] = [];
  loading = false;
  page = 0;
  pageSize = 10;
  
  startCity !: City |null;
  endCity !: City | null;
  date!: string;

  constructor(private http: HttpClient, private cityService: InfinitescrollserviceService) {}

  ngOnInit() {
    this.cityService.startCity$.subscribe((city) => {
      this.startCity = city;
      this.resetAndLoad();
    });

    this.cityService.endCity$.subscribe((city) => {
      this.endCity = city;
      this.resetAndLoad();
    });

    this.cityService.date$.subscribe((date) => {
      this.date = date;
      this.resetAndLoad();
    });
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
    if (this.loading || !this.startCity || !this.endCity) {
      return;
    }

    this.loading = true;

    this.http.get<TripResponse[]>(`http://localhost:8080/api/trip/filtered-trips?page=${this.page}&size=${this.pageSize}&startCity=${encodeURIComponent(this.startCity.name)}&endCity=${encodeURIComponent(this.endCity.name)}&date=${encodeURIComponent(this.date)}`)
      .subscribe({
        next: (data) => {
          this.items = [...this.items, ...data];
          this.page++;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading data', err);
          this.loading = false;
        }
      });
  }

  resetAndLoad() {
    this.page = 0;
    this.items = [];
    this.loadMore();
  }
}
