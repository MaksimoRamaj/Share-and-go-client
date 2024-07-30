import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../shared/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  startCitySubject = new BehaviorSubject<City>({ name: 'Berat', lat: 40.7058, lng: 19.9522 });
  endCitySubject = new BehaviorSubject<City>({ name: 'Korce', lat: 40.6275, lng: 20.9897 });

  startCity$ = this.startCitySubject.asObservable();
  endCity$ = this.endCitySubject.asObservable();

  updateStartCity(city: City): void {
    this.startCitySubject.next(city);
  }

  updateEndCity(city: City): void {
    this.endCitySubject.next(city);
  }
}
