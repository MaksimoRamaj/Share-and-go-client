import { Component, input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Trip } from '../../../../shared/trip.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookingType } from '../../../../shared/bookingtype.model';
import { TripService } from '../tripdetails/trip.service';

@Component({
  selector: 'app-triplist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css'
})
export class TriplistComponent {

  constructor(private route: Router,private tripService:TripService) { }

  trips : Trip[] = [{
    id: 105,
    startCity: "Berat",
    endCity: "Elbasan",
    dateOfTrip: "2024-08-01",
    timeOfTrip: "07:00",
    passengerCount: 3,
    duration: 90,
    distance: 151,
    pricePerSeat: 0
  }
  ]


  getTripDetails(id : number){
      this.tripService.tripId = id;
      this.route.navigate(['/driver-profile/trip/'+id]);
  }
}
