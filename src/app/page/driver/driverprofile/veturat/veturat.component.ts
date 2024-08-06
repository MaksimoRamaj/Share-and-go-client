import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarResponse } from '../../../../shared/responses/carresponse.model';
import { VeturatService } from './veturat.service';
import { AddcarformComponent } from "./addcarform/addcarform.component";
import { RemovecarformComponent } from "./removecarform/removecarform.component";
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-veturat',
  standalone: true,
  imports: [AddcarformComponent, RemovecarformComponent,AsyncPipe],
  templateUrl: './veturat.component.html',
  styleUrl: './veturat.component.css'
})
export class VeturatComponent implements OnInit {


  cars : CarResponse[] = [];
  
  isCarAddedFormActive = this.veturatService.isCarAddedFormActive;
  isCarRemovedFormActive = this.veturatService.isCarRemovedFormActive;

  rows = new BehaviorSubject<Array<number>>([]);
  rows$ = this.rows.asObservable();

  constructor(private http : HttpClient,private veturatService : VeturatService) { } 

  ngOnInit(): void {

    this.veturatService.fetchCars().subscribe({
        next: (response) => {
          this.cars = response;
          this.rows.next(this.noOfRows());
        },
        error: (error) => {
          console.error(error);
        }}
    )
    }

    noOfRows(){
      return new Array(Math.ceil(this.cars.length/3));
    }

    noOfCols(){
      return new Array(3);
    }

    toggleAddCarForm(){
      this.scrollToTop();
      this.veturatService.toggleAddCarForm();
    }

    toggleRemoveCarForm(){
      this.scrollToTop();
      this.veturatService.toggleRemoveCarForm();
    }

    scrollToTop() {
      const topContainer = document.getElementById('top-container');
      if (topContainer) {
          topContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
}
