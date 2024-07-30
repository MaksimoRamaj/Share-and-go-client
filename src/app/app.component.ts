import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FindTripFormComponent } from "./forms/find-trip-form/find-trip-form.component";
import { CardsComponent } from "./cards/cards.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { MapComponent } from "./map/map.component";
import { HomepageComponent } from "./page/homepage/homepage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OfferDriveFormComponent, RouterOutlet, FindTripFormComponent, CardsComponent, FooterComponent, NavbarComponent, MapComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

  
  title = 'carpool';


}
