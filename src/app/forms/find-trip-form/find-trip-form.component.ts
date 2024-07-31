import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbars/navbar/navbar.component";
import { AboutComponent } from "../../about/about.component";
import { CardsComponent } from '../../cards/cards.component';

@Component({
  selector: 'app-find-trip-form',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent, AboutComponent, CardsComponent,RouterOutlet],
  templateUrl: './find-trip-form.component.html',
  styleUrl: './find-trip-form.component.css'
})
export class FindTripFormComponent {

}
