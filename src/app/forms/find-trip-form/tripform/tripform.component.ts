import { Component, inject, OnInit } from '@angular/core';
import { BookingType } from '../../../shared/bookingtype.model';
import { Trip } from '../../../shared/trip.model';
import { City } from '../../../shared/city.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CityService } from '../../../shared/city.service';
import { Router } from '@angular/router';
import { citiesArray } from '../../../shared/citiesArray.model';
import { FormsModule } from '@angular/forms';
import { InfinitescrollserviceService } from '../../../page/passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';

@Component({
  selector: 'app-tripform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tripform.component.html',
  styleUrl: './tripform.component.css'
})
export class TripformComponent implements OnInit{ 
  tripDetails: Trip = {
  startCity: '',
  endCity: '',
  dateOfTrip: '',
  timeOfTrip: "07:00",
  passengerCount: 1,
  duration: 0,
  distance: 0,
  pricePerSeat: 0
};

filteredFromCityOptions: City[] = [];
filteredToCityOptions: City[] = [];
cities: City[] = citiesArray;

updatedStartCity : City = { name: '', lat: 0, lng: 0 };
updatedEndCity : City = { name: '', lat: 0, lng: 0 };
updatedDate : string = '';

constructor(private cityService: InfinitescrollserviceService) {}

ngOnInit(): void {}

onInputFromCity(event: Event): void {
  const query = this.tripDetails.startCity.toLowerCase();
  this.filteredFromCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
}

selectFromCity(city: City): void {
  this.tripDetails.startCity = city.name;
  this.updatedStartCity = city;
  // this.cityService.updateStartCity(city);
  this.filteredFromCityOptions = [];
}

onInputToCity(event: Event): void {
  const query = this.tripDetails.endCity.toLowerCase();
  this.filteredToCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
}

selectToCity(city: City): void {
  this.tripDetails.endCity = city.name;
  // this.cityService.updateEndCity(city);
  this.updatedEndCity = city;
  this.filteredToCityOptions = [];
}

onInputToDate(event: Event): void {
  // this.cityService.updateDate(this.tripDetails.dateOfTrip);
  this.updatedDate = this.tripDetails.dateOfTrip;
}

submitForm(): void {
  if (this.tripDetails.startCity === '' || this.tripDetails.endCity === '' || this.tripDetails.dateOfTrip === '') {
    alert('Please fill all the fields');
    return;}
    console.log("this.tripDetails");
  this.cityService.updateStartCity(this.updatedStartCity);
  this.cityService.updateEndCity(this.updatedEndCity);
  this.cityService.updateDate(this.updatedDate);
  this.cityService.updateReady(true);
}

shfaqGjithe(){
  this.cityService.updateStartCity({ name: '', lat: 0, lng: 0 });
  this.cityService.updateEndCity({ name: '', lat: 0, lng: 0 });
  this.cityService.updateDate('');
  this.cityService.updateReady(true);
}
}

