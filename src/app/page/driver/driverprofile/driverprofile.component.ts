import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../footer/footer.component";
import { NavbarComponent } from "../../../navbars/navbar/navbar.component";
import { ProfileInfoComponent } from "./profile-info/profile-info.component";
import { TriplistComponent } from "./triplist/triplist.component";
import { RouterOutlet } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Trip } from '../../../shared/trip.model';

@Component({
  selector: 'app-driverprofile',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, ProfileInfoComponent, TriplistComponent, RouterOutlet],
  templateUrl: './driverprofile.component.html',
  styleUrl: './driverprofile.component.css'
})
export class DriverprofileComponent{


}
