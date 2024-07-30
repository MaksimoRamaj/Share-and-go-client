import { Component } from '@angular/core';
import { FindTripFormComponent } from '../../../forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from '../../../forms/offer-drive-form/offer-drive-form.component';
import { MapComponent } from '../../../map/map.component';

@Component({
  selector: 'app-post-drive',
  standalone: true,
  imports: [OfferDriveFormComponent,MapComponent],
  templateUrl: './post-drive.component.html',
  styleUrl: './post-drive.component.css'
})
export class PostDriveComponent {

}
