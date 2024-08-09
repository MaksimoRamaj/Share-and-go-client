import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingType } from '../../shared/bookingtype.model';
import { Trip } from '../../shared/trip.model';
import { CityService } from '../../shared/city.service';
import { citiesArray } from '../../shared/citiesArray.model';
import { City } from '../../shared/city.model';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MyInterceptor } from '../../services/my-interceptor.service';
import { Router } from '@angular/router';
import { OfferDriveFormComponentCssService } from './offer-drive-form.component.css.service';

@Component({
  selector: 'app-offer-drive-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './offer-drive-form.component.html',
  styleUrls: ['./offer-drive-form.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ]
})
export class OfferDriveFormComponent implements OnInit {

  private cityService = inject(CityService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private offerDriverService = inject(OfferDriveFormComponentCssService); 

  bookingTypes = Object.values(BookingType);

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

  filteredFromCityOptions: City[] = [];
  filteredToCityOptions: City[] = [];

  cities: City[] = citiesArray;

  ngOnInit(): void {
    this.cityService.duration$.subscribe(duration => {
      this.tripDetails.duration = duration;
    });
    this.cityService.distance$.subscribe(distance => {
      this.tripDetails.distance = distance;
    });
  }

  onInputFromCity(event: Event): void {
    const query = this.tripDetails.startCity.toLowerCase();
    this.filteredFromCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
  }

  selectFromCity(city: City): void {
    this.tripDetails.startCity = city.name;
    this.cityService.updateStartCity(city);
    this.filteredFromCityOptions = [];
  }

  onInputToCity(event: Event): void {
    const query = this.tripDetails.endCity.toLowerCase();
    this.filteredToCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
  }

  selectToCity(city: City): void {
    this.tripDetails.endCity = city.name;
    this.cityService.updateEndCity(city);
    this.filteredToCityOptions = [];
  }

  submitForm(): void {
    const url = 'http://localhost:8080/api/trip/create-trip';  // Replace with your actual API endpoint
    this.offerDriverService.tripDet.next(this.tripDetails);
   
    this.router.navigate(['driver-preferences']);
  }
}
