import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ReviewResponse } from '../../../../shared/responses/reviewresponse.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http : HttpClient) { }

  isOpen = signal(false);
  tripId = signal(-1);

  fetchAllReviews(){
    return this.http.get<ReviewResponse[]>('http://localhost:8080/api/feedback/review/by-trip?id='+this.tripId(),{observe: 'response'})
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Conflict error:', error.error);
      alert('Permbajtja nuk u gjet. Ju lutem provoni perseri.');
    } else {
      console.error('An unexpected error occurred:', error.error);
      alert('An unexpected error occurred. Please try again later.');
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
