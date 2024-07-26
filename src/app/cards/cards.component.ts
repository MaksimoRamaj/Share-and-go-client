import { Component } from '@angular/core';
import { CardComponent } from "./card/card.component";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

}
