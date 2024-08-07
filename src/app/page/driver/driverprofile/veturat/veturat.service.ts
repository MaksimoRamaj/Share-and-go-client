import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { CarResponse } from '../../../../shared/responses/carresponse.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeturatService {

  carToBeRemoved : WritableSignal<CarResponse> = signal({} as CarResponse);

  updateCars = new BehaviorSubject<boolean>(false);
  updateCars$ = this.updateCars.asObservable();

  constructor( private http : HttpClient) { }

  isCarAddedFormActive = signal(false);
  isCarRemovedFormActive = signal(false);

  toggleAddCarForm(){
    this.isCarAddedFormActive.set(!this.isCarAddedFormActive());
  }

  toggleRemoveCarForm(){
    this.isCarRemovedFormActive.set(!this.isCarRemovedFormActive());
  }

  fetchCars(){
    return this.http.get<CarResponse[]>('http://localhost:8080/api/car/all-cars');
  }

}
