import { Component } from '@angular/core';
import { TripComponent } from "./trip/trip.component";

@Component({
  selector: 'app-unfilteredtrips',
  standalone: true,
  imports: [TripComponent],
  templateUrl: './unfilteredtrips.component.html',
  styleUrl: './unfilteredtrips.component.css'
})
export class UnfilteredtripsComponent {

}
