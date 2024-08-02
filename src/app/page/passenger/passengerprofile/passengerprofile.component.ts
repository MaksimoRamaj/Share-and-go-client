import { Component } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { NavbarComponent } from '../../../navbars/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ProfileInfoComponent } from '../../driver/driverprofile/profile-info/profile-info.component';

@Component({
  selector: 'app-passengerprofile',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,RouterOutlet,ProfileInfoComponent],
  templateUrl: './passengerprofile.component.html',
  styleUrl: './passengerprofile.component.css'
})
export class PassengerprofileComponent {

}
