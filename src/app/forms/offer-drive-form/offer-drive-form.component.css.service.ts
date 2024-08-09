import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../../shared/trip.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferDriveFormComponentCssService {

  tripDet = new BehaviorSubject<Trip>({startCity: 'Berat', endCity: 'Korce', dateOfTrip: new Date().toISOString().split('T')[0], timeOfTrip: "07:00", pricePerSeat: 0, passengerCount: 1, duration: 0, distance: 0});
  tripDet$ = this.tripDet.asObservable();

  constructor(private http : HttpClient, private router : Router) { }

  tripDetails: Trip = {
    startCity: 'Berat',
    endCity: 'Korce',
    dateOfTrip: new Date().toISOString().split('T')[0],
    timeOfTrip: "07:00",
    pricePerSeat: 0,
    passengerCount: 1,
    duration: 0,
    distance: 0,
  };
}
