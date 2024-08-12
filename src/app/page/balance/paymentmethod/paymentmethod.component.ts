import { Component } from '@angular/core';
import { Rechargerequest } from '../../../shared/requests/rechargerequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentmethod',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paymentmethod.component.html',
  styleUrl: './paymentmethod.component.css'
})
export class PaymentmethodComponent {

  recharegeRequest : Rechargerequest = {} as Rechargerequest;

  constructor(private http : HttpClient,private router : Router) { }

  rimbush(){
    if(this.recharegeRequest.amount === 0){
      alert('Shuma nuk mund te jete 0');
      return;
    }
    if(this.recharegeRequest.amount < 0){
      alert('Shuma nuk mund te jete negative');
      return;
    }
    
    this.http.post('http://localhost:8080/api/recharge',this.recharegeRequest,{observe: 'response'})
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          alert('Rimbushja u krye me sukses!');
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        if(error.status === 200){
          alert('Rimbushja u krye me sukses!');
          this.router.navigate(['']);
        }
      }
    });
  }
}
