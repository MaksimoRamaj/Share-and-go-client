import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PreferenceRequest } from '../../../../shared/requests/preferencerequest.model';
import { NavbarComponent } from "../../../../navbars/navbar/navbar.component";
import { FooterComponent } from "../../../../footer/footer.component";
import { VeturatComponent } from "../../driverprofile/veturat/veturat.component";
import { OfferDriveFormComponentCssService } from '../../../../forms/offer-drive-form/offer-drive-form.component.css.service';
import { Trip } from '../../../../shared/trip.model';
import { CarResponse } from '../../../../shared/responses/carresponse.model';
import { VeturatService } from '../../driverprofile/veturat/veturat.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-secondpreferencespage',
  standalone: true,
  imports: [FormsModule, NavbarComponent, FooterComponent, VeturatComponent],
  templateUrl: './secondpreferencespage.component.html',
  styleUrl: './secondpreferencespage.component.css'
})
export class SecondpreferencespageComponent implements OnInit{

  preferences : PreferenceRequest[] = [];
  hasPreferences = false;
  nextPreference = '';
 

  cars : CarResponse[] = [];
  selectedCar : CarResponse = this.cars[0];

  constructor(private veturatService : VeturatService
    ,private http : HttpClient,private router : Router, private offerdriveService : OfferDriveFormComponentCssService) { }

  ngOnInit(): void {  

    this.veturatService.fetchCars().subscribe({
      next: (response) => {
        this.cars = response;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.veturatService.updateCars$.subscribe({
      next: (response) => {
        if(response == true){
          this.veturatService.fetchCars().subscribe({
            next: (response) => {
              this.cars = response;
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      }
    });

  }

  addPreference() {
    if(this.nextPreference === '') {
      return;
    }
    this.preferences.push({title: this.nextPreference});
    this.nextPreference = '';
  }

  removePreference(toBeRemoved : PreferenceRequest) {
    this.preferences = this.preferences.filter(preference => preference.title !== toBeRemoved.title);
  }

  trip !: Trip;
  carId = 0;  

  submitForm(){
    const url = 'http://localhost:8080/api/trip/create-trip'; 

    this.offerdriveService.tripDet$.subscribe({
      next: (trip: Trip) => {
        this.trip = trip;
        this.trip.carId = this.selectedCar.id;
        console.log('Car ID:', this.trip.carId);  // Accessing the car ID
        console.log('Trip details:', this.trip);  // Accessing the trip details
      },
      error: (error: any) => {
        console.error('Error getting trip details', error);
      },
      complete: () => { 
        console.log('Trip details fetched successfully');
      }
    })

    this.http.post(url, this.trip ,{observe: 'response'})
    .pipe(
      catchError(this.handleError)
    )
      .subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status == 200){
          this.http.post('http://localhost:8080/api/preference/choose-preferences', 
            this.preferences).subscribe({
              next: data => {
                alert('Preferencat u ruajten me sukses!');
                this.router.navigate(['driver-profile']);
              },
            }); 
        }
      },
       
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      // Handle 409 Conflict
      console.error('Conflict error:', error.error);
      alert('Conflict error:' + error.error);
    } else if (error.status === 200) {
      alert('Preferencat u ruajten me sukses!');
      this.router.navigate(['']);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

