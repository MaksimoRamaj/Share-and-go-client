import { Component } from '@angular/core';
import { ReviewformService } from './reviewform.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReviewRequest } from '../../../../shared/requests/reviewrequest.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-reviewform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reviewform.component.html',
  styleUrl: './reviewform.component.css'
})
export class ReviewformComponent {

    constructor(private reviewService : ReviewformService,private http : HttpClient) { }


    mesage = '';
    rating = 0;

    toggle(){
        this.reviewService.isOpen.set(!this.reviewService.isOpen());
    }

    dergo(){

        const review : ReviewRequest = {
            recipientId: this.reviewService.driverId(),
            tripId: this.reviewService.tripId(),
            rating: this.rating,
            comment: this.mesage
        }

        if(review.rating === 0){
            alert('Rating is required');
            return;
        }
        if(review.tripId === -1 || review.recipientId === -1){
            alert('Probleme me marrjen e te dhenave per udhetimin ose identifikimin e shoferit!');
            return;
        }


        this.http.post('http://localhost:8080/api/feedback/review/leave-review',review,{observe: 'response'})
        .pipe(
          catchError(this.handleError)
        ).subscribe({
            next: (response) => {
              console.log(response);
                if(response.status === 200){
                    alert('Pershtypja u la me sukses!');
                    this.reviewService.isOpen.set(false);
                }else if(response.status === 409){
                    alert('Ju keni lene pershtypje per kete udhetim me pare!');
                }
            },
            error: (error) => {
              if(error.status === 200){
                alert('Pershtypja u la me sukses!');
                this.reviewService.isOpen.set(false);
            }
            },
            complete: () => {
                this.reviewService.isOpen.set(false);
            }
        });
    }

    private handleError(error: HttpErrorResponse) {
      if (error.status === 409) {
        // Handle 409 Conflict
        console.error('Conflict error:', error.error);
        alert('Ju keni lene pershtypje per kete udhetim me pare!');
      } else {
        // Handle other errors
        console.error('An unexpected error occurred:', error.error);
        alert('An unexpected error occurred. Please try again later.');
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
