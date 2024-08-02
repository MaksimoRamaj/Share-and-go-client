import { Component } from '@angular/core';
import { FindTripFormComponent } from '../../../forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from '../../../forms/offer-drive-form/offer-drive-form.component';
import { MapComponent } from '../../../map/map.component';
import { FooterComponent } from "../../../footer/footer.component";
import { AuthService } from '../../../services/auth-service.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../navbars/navbar/navbar.component";

@Component({
  selector: 'app-post-drive',
  standalone: true,
  imports: [OfferDriveFormComponent, MapComponent, FooterComponent, NavbarComponent,RouterOutlet],
  templateUrl: './post-drive.component.html',
  styleUrl: './post-drive.component.css'
})
export class PostDriveComponent {

  constructor() { }  

}
