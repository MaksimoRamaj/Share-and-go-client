import { Component, inject, OnInit } from '@angular/core';
import { BookingType } from '../../../shared/bookingtype.model';
import { Trip } from '../../../shared/trip.model';
import { City } from '../../../shared/city.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CityService } from '../../../shared/city.service';
import { Router } from '@angular/router';
import { citiesArray } from '../../../shared/citiesArray.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tripform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tripform.component.html',
  styleUrl: './tripform.component.css'
})
export class TripformComponent implements OnInit{
  private cityService = inject(CityService);
  private http = inject(HttpClient);
  private router = inject(Router);

  bookingTypes = Object.values(BookingType);

  tripDetails: Trip = {
    startCity: 'Zgjidh qytetin ...',
    endCity: 'Zgjidh qytetin ...',
    dateOfTrip: new Date().toISOString().split('T')[0],
    timeOfTrip: "07:00",
    passengerCount: 1,
    duration: 0,
    distance: 0,
    pricePerSeat: 0
  };

  filteredFromCityOptions: City[] = [];
  filteredToCityOptions: City[] = [];

  cities: City[] = citiesArray;

  ngOnInit(): void {
   
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
    // const url = 'http://localhost:8080/api/trip/create-trip';  // Replace with your actual API endpoint
    // this.http.post(url, this.tripDetails,{observe: 'response'}).subscribe({
    //   next: (response: HttpResponse<any>) => {
    //     console.log('Trip details submitted successfully', response);
    //     console.log('Status Code:', response.status);  // Accessing the status code
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.error('Error submitting trip details', error);
    //     console.log('Status Code:', error.status);  // Accessing the status code in case of error
    //   }
    // });
    //to be added to next 
   
  }
}

