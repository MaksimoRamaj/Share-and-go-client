import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CarResponse } from '../../../../shared/responses/carresponse.model';

@Injectable({
  providedIn: 'root'
})
export class VeturatService {

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
