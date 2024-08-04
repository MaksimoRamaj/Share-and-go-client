import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';
import { TripResponse } from '../../../../shared/responses/tripresponse.model';

@Component({
  selector: 'app-inifintescrolltrips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inifintescrolltrips.component.html',
  styleUrl: './inifintescrolltrips.component.css'
})
export class InifintescrolltripsComponent implements OnInit {
  
  items: TripResponse[] = [];
  loading = false;
  page = 0;
  pageSize = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMore();
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

    this.http.get<TripResponse[]>('http://localhost:8080/api/trip/all-trips').subscribe(
      {
        next: (data) => {
          this.items = [...this.items, ...data];
          this.page++;
          this.loading = false;
        }
      }
      
    );
    // this.fetchItems(this.page, this.pageSize).subscribe((newItems) => {
    //   this.items = [...this.items, ...newItems];
    //   this.page++;
    //   this.loading = false;
    // });
  }

  fetchItems(page: number, pageSize: number) {
    // Simulate an API call
    return of(Array.from({ length: pageSize }, (_, i) => ({
      date: 'Sunday, August 4',
      startTime: '21:00',
      startLocation: 'White City',
      price: '30 €',
      endTime: '04:55',
      endLocation: 'Ulcinj',
      profileImage: 'https://via.placeholder.com/40',
      name: `Zoran ${page * pageSize + i + 1}`,
      smokingIcon: 'https://via.placeholder.com/20',
      petIcon: 'https://via.placeholder.com/20'
    }))).pipe(
      delay(1000)
    );
  }
}