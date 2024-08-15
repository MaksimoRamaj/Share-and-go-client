import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivetripsService {

  tripId = new BehaviorSubject<{tripId : number,availableSeats:number}>({tripId : -1,availableSeats : 0});
  tripId$ = this.tripId.asObservable();

  constructor() { }

  openTripApplications(tripId : number,availableSeats : number){
    this.tripId.next({tripId,availableSeats});
  }

  openRequests = signal(false);

}
