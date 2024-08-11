import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../../../../shared/city.model';

@Injectable({
  providedIn: 'root'
})
export class InfinitescrollserviceService {
  private startCitySubject = new BehaviorSubject<City | null>(null);
  private endCitySubject = new BehaviorSubject<City | null>(null);
  private dateSubject = new BehaviorSubject<string>('');

  startCity$ = this.startCitySubject.asObservable();
  endCity$ = this.endCitySubject.asObservable();
  date$ = this.dateSubject.asObservable();

  hasTrips : WritableSignal<boolean> = signal(false);

 private ready  = new BehaviorSubject<boolean>(false);
  ready$ = this.ready.asObservable();

  updateStartCity(city: City) {
    this.startCitySubject.next(city);
  }

  updateEndCity(city: City) {
    this.endCitySubject.next(city);
  }

  updateDate(date: string) {
    this.dateSubject.next(date);
  }

  updateReady(value: boolean){
    this.ready.next(value);
  }

}
