import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cities } from '../../shared/cities.model';
import { BookingType } from '../../shared/bookingtype.model';
import { Trip } from '../../shared/trip.model';

@Component({
  selector: 'app-offer-drive-form',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './offer-drive-form.component.html',
  styleUrl: './offer-drive-form.component.css'
})
export class OfferDriveFormComponent implements OnInit {

  bookingTypes = Object.values(BookingType);

  tripDetails : Trip = {
    fromCity: "Tirane",
    toCity: "Shkoder",
    dateOfTrip: new Date().toISOString().split('T')[0],
    timeOfTrip: "07:00",
    bookingType: this.bookingTypes[0],
    passengerCount: 1,
    duration: 0,
    distance:0
  }

  filteredFromCityOptions : any = signal([]);
  filteredToCityOptions : any = signal([]);

  cities : string[] = Object.values(Cities);

  ngOnInit(){
    
  }

  onInputFromCity(event: Event){
    const query = this.tripDetails.fromCity.toLowerCase();
    this.filteredFromCityOptions.set(this.cities.filter(option => option.toLowerCase().includes(query)));
    console.log(this.tripDetails.bookingType)
  }

  selectFromCity(city: string){
    this.tripDetails.fromCity = city;
    this.filteredFromCityOptions.set([]);
  }

  onInputToCity(event: Event){
    const query = this.tripDetails.toCity.toLowerCase();
    this.filteredToCityOptions.set(this.cities.filter(option => option.toLowerCase().includes(query)));
  }

  selectToCity(city: string){
    this.tripDetails.toCity = city;
    this.filteredToCityOptions.set([]);
  }

}
