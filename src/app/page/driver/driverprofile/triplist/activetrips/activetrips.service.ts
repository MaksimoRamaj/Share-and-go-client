import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivetripsService {

  tripId = new BehaviorSubject<number>(0);
  tripId$ = this.tripId.asObservable();

  constructor() { }

  openTripApplications(tripId : number){
    this.tripId.next(tripId);
  }

  openRequests = signal(false);

}
