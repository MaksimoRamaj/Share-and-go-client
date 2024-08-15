import { Component, OnInit } from '@angular/core';
import { ActivetripsService } from '../activetrips.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TripApplicationResponse } from '../../../../../../shared/responses/tripapplicationresponse.model';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { SweetAlertService } from '../../../../../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-jointriprequests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jointriprequests.component.html',
  styleUrl: './jointriprequests.component.css'
})
export class JointriprequestsComponent implements OnInit {  

  tripApplicationResponses : TripApplicationResponse[] = []; 
  availableSeats : number = 0;
  constructor(private activeTripsService : ActivetripsService
    ,private http: HttpClient,private swal : SweetAlertService
  ) { }
    
  close(){
    this.activeTripsService.openRequests.set(false);
  }

  lastTripId : number = -1;

  ngOnInit(): void {
    this.activeTripsService.tripId$.subscribe({
      next: ({tripId,availableSeats}) => {
        this.lastTripId = tripId;
        this.availableSeats = availableSeats;
        this.fetchRequests(tripId);
      }
    });
  }

  onScroll() {
    const container = document.querySelector('.container');
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // this.loadMore();
      }
    }
  }

  fetchRequests(tripId : number){
      this.http.get<TripApplicationResponse[]>
      ('http://localhost:8080/api/trip-application/for-driver-by-trip-id?id='+tripId, 
        {observe: 'response'} )
      .subscribe({
        next: (response) => {
          if(response.status === 200){
            if(response.body){
              this.tripApplicationResponses = response.body;
            }
          }else if(response.status === 204){
            console.log('No requests found!');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  acceptRequest(requestId:number){

    let requestedNoOfSeats = this.tripApplicationResponses
    .filter((tripApplication) => tripApplication.id == requestId)[0].numberOfSeats;

    if(requestedNoOfSeats > this.availableSeats){
      this.swal.infoNotification('Kujdes!','Ju nuk keni vend te mjaftueshem ne makine!');
      return;
    }

    this.http.put('http://localhost:8080/api/booking/confirm-application?id='+requestId,null,{observe: 'response',responseType: 'text'})
    .pipe(
      catchError((error: HttpErrorResponse) => { return this.handleError(error,requestId); })
    )
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          console.log('Request accepted!');
          this.activeTripsService.tripId.next({tripId:this.lastTripId,availableSeats:this.availableSeats});
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private handleError(error: HttpErrorResponse,requestId:number) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      this.activeTripsService.tripId.next({tripId:this.lastTripId,availableSeats:this.availableSeats});
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong with the request; please try again later.'));
  }

  rejectRequest(requestId:number){
    this.http.put('http://localhost:8080/api/booking/reject-application?id='+requestId,null,{observe: 'response',responseType: 'text'})
    .pipe(
      catchError((error: HttpErrorResponse) => { return this.handleError(error,requestId); })
    )
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          console.log('Request rejected!');
          this.activeTripsService.tripId.next({tripId:this.lastTripId,availableSeats:this.availableSeats});
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
