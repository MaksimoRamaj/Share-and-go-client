import { Component } from '@angular/core';
import { OfferDriveFormComponent } from '../../forms/offer-drive-form/offer-drive-form.component';
import { RouterOutlet } from '@angular/router';
import { FindTripFormComponent } from '../../forms/find-trip-form/find-trip-form.component';
import { CardsComponent } from '../../cards/cards.component';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbars/navbar/navbar.component';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [OfferDriveFormComponent, RouterOutlet, FindTripFormComponent, CardsComponent, 
    FooterComponent, NavbarComponent, MapComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
