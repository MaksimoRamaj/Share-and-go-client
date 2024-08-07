import { Component, OnInit } from '@angular/core';
import { VeturatService } from '../veturat.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-removecarform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './removecarform.component.html',
  styleUrl: './removecarform.component.css'
})
export class RemovecarformComponent implements OnInit{

  cars = this.veturatService.carToBeRemoved;

  constructor(private veturatService : VeturatService, private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    
  }

  toggle(){ 
    this.veturatService.toggleRemoveCarForm();
  }

  onSubmit(){ 
    this.http.delete('http://localhost:8080/api/car/delete-car?id='+this.cars().id).subscribe({
      next: (response) => {
        alert('Car removed successfully');
        this.toggle();
      },
      error: (error) => {
        if(error.status === 200){
          alert('Makina u fshi me sukses!');
          this.veturatService.updateCars.next(true);
          this.toggle();
        }else{
                  console.error(error);
        }
      }
    })  
  }
}
