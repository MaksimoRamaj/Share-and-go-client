import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingType } from '../../shared/bookingtype.model';
import { Trip } from '../../shared/trip.model';
import { CityService } from '../../shared/city.service';
import { citiesArray } from '../../shared/citiesArray.model';
import { City } from '../../shared/city.model';

@Component({
  selector: 'app-offer-drive-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './offer-drive-form.component.html',
  styleUrls: ['./offer-drive-form.component.css']
})
export class OfferDriveFormComponent implements OnInit {

  private cityService = inject(CityService);

  bookingTypes = Object.values(BookingType);

  tripDetails: Trip = {
    fromCity: 'Berat',
    toCity: 'Korce',
    dateOfTrip: new Date().toISOString().split('T')[0],
    timeOfTrip: "07:00",
    bookingType: this.bookingTypes[0],
    passengerCount: 1,
    duration: 0,
    distance: 0
  };

  filteredFromCityOptions: City[] = [];
  filteredToCityOptions: City[] = [];

  cities: City[] = citiesArray;

  ngOnInit(): void {}

  onInputFromCity(event: Event): void {
    const query = this.tripDetails.fromCity.toLowerCase();
    this.filteredFromCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
  }

  selectFromCity(city: City): void {
    this.tripDetails.fromCity = city.name;
    this.cityService.updateStartCity(city);
    this.filteredFromCityOptions = [];
  }

  onInputToCity(event: Event): void {
    const query = this.tripDetails.toCity.toLowerCase();
    this.filteredToCityOptions = this.cities.filter(city => city.name.toLowerCase().includes(query));
  }

  selectToCity(city: City): void {
    this.tripDetails.toCity = city.name;
    this.cityService.updateEndCity(city);
    this.filteredToCityOptions = [];
  }
}
