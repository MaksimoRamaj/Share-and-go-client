import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { TripResponse } from '../../../../shared/responses/tripresponse.model';
import { ProfileService } from '../../../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class TripserviceService{

  selectedTripId = signal<number>(1);
  
  trip !: TripResponse;

  isApplying = signal<boolean>(false);

  constructor(private http : HttpClient,) { }

  
  getTripByTripId(tripId : number){
    return this.http.get<TripResponse>('http://localhost:8080/api/trip/trip-by-id?id='+tripId);
  }

  

  toggle(){
    this.isApplying.set(!this.isApplying());
  }
}
