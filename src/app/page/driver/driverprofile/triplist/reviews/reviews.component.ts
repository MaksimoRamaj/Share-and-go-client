import { Component, OnInit } from '@angular/core';
import { ReviewformService } from '../../../../passenger/ptriplist/reviewform/reviewform.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { ReviewResponse } from '../../../../../shared/responses/reviewresponse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  stars = [1,2,3,4,5];


  constructor(private reviewService : ReviewsService,private http : HttpClient) { }

  reviews : ReviewResponse[] = [];

  mesage = '';
  rating = 0;

  ngOnInit(): void {
    this.fetchAllReviews();
  }

  toggle(){
      this.reviewService.isOpen.set(!this.reviewService.isOpen());
  }

  fetchAllReviews(){
   this.reviewService.fetchAllReviews()
   .subscribe({
    next: (response) => {
      if(response.status === 200){
        if(!(response.body === null)){
        this.reviews = response.body;
        }
    }},
    error: (error) => {
      console.log(error);
    }
  });;
  }

}

