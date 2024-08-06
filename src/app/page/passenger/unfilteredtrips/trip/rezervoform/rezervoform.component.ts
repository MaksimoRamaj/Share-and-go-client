import { Component, OnInit } from '@angular/core';
import { TripserviceService } from '../tripservice.service';
import { BookingType } from '../../../../../shared/bookingtype.model';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PackageRequest } from '../../../../../shared/requests/packagerequest.model';
import { PackageRequestWithId } from '../../../../../shared/requests/pckgReqWithId.model';
import { TripApplicationRequest } from '../../../../../shared/requests/tripApplicationRequest.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rezervoform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rezervoform.component.html',
  styleUrl: './rezervoform.component.css'
})
export class RezervoformComponent implements OnInit{

   
    bookingTypes = Object.values(BookingType);

    packages : PackageRequest[] = [];

    luggage : PackageRequestWithId = {
      id: 0,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      receiverPhoneNumber: '',
    };

    luggages : PackageRequestWithId[] = [];

    package = false;
    shfaqValixhe = false;
    counter = 0;
    actualTrip = this.tripService.trip;

    bookingType = BookingType.PACKAGE_ONLY;
    
    tripApplicationRequest : TripApplicationRequest= {
      applicationType: '',
      tripId: this.tripService.selectedTripId(),
      numberOfSeats: 0,
      packages: []
    };

    constructor(private tripService : TripserviceService, private http : HttpClient, private router : Router) { }

    ngOnInit(): void {

    
    }

    toggle(){
      this.tripService.toggle();
    }

    shtoValixhe(){
      if((this.luggage.weight == 0 || this.luggage.length == 0 || 
        this.luggage.width == 0 || this.luggage.height == 0) && (this.bookingType == BookingType.PASSENGER_WITH_PACKAGE)){
        return;
      }else if((this.bookingType == BookingType.PACKAGE_ONLY && this.luggage.receiverPhoneNumber == '') || (this.luggage.weight == 0 || this.luggage.length == 0 || 
        this.luggage.width == 0 || this.luggage.height == 0)){
        return;
      }
      this.luggages.push({
        id: this.counter++,
        weight: this.luggage.weight,
        length: this.luggage.length,
        width: this.luggage.width,
        height: this.luggage.height,
        receiverPhoneNumber: this.luggage.receiverPhoneNumber
      });

      console.log(this.luggages);
    }

    fshiValixhee(id : number){
        this.luggages = this.luggages.filter(luggage => luggage.id !== id);
    }

    shfaqValixhef(){
      this.shfaqValixhe = !this.shfaqValixhe;
    }

    rezervo(){
        this.luggages.forEach(luggage => {
          this.packages.push({
            weight: luggage.weight,
            length: luggage.length,
            width: luggage.width,
            height: luggage.height
          });
        });

        this.tripApplicationRequest.packages = this.packages;
        this.tripApplicationRequest.applicationType = this.bookingType;
        this.http.post<TripApplicationRequest>('http://localhost:8080/api/trip-application/apply-to-reserve', this.tripApplicationRequest, { observe: 'response' }).subscribe(
          {
            next: (response: HttpResponse<TripApplicationRequest>) => {
              const statusCode = response.status;
              if (statusCode === 200) {
                  this.router.navigate(['']);
              }
            },
            error: (error) => {
              console.log('Error:', error);
              if (error.status === 200) {
                this.router.navigate(['']);

              }
             
            }
            }
        );
    }
}
