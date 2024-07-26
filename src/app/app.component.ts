import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FindTripFormComponent } from "./forms/find-trip-form/find-trip-form.component";
import { CardsComponent } from "./cards/cards.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from './navbars/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FindTripFormComponent, CardsComponent, FooterComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carpool';
}
