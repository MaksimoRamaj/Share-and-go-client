import { Component } from '@angular/core';
import { TripserviceService } from '../tripservice.service';

@Component({
  selector: 'app-rezervoform',
  standalone: true,
  imports: [],
  templateUrl: './rezervoform.component.html',
  styleUrl: './rezervoform.component.css'
})
export class RezervoformComponent {

    constructor(private tripService : TripserviceService) { }

    toggle(){
      console.log("Toggling rezervi")
      this.tripService.toggle();
    }
}
