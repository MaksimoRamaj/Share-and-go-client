import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { TripService } from '../../driver/driverprofile/tripdetails/trip.service';
import { Trip } from '../../../shared/trip.model';
import { BookingType } from '../../../shared/bookingtype.model';

@Component({
  selector: 'app-ptriplist',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ptriplist.component.html',
  styleUrl: './ptriplist.component.css'
})
export class PtriplistComponent {
  constructor(private route: Router,private tripService:TripService) { }

  trips : Trip[] = [{
    id: 105,
    fromCity: "Berat",
    toCity: "Elbasan",
    dateOfTrip: "2024-08-01",
    timeOfTrip: "07:00",
    bookingType: BookingType.PASSENGER_ONLY,
    passengerCount: 3,
    duration: 90,
    distance: 151,
    cmimi: 0
  }
  ]


  getTripDetails(id : number){
      this.tripService.tripId = id;
      this.route.navigate(['/driver-profile/trip/'+id]);
  }
}
