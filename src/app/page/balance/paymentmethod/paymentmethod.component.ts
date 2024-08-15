import { Component } from '@angular/core';
import { Rechargerequest } from '../../../shared/requests/rechargerequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-paymentmethod',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paymentmethod.component.html',
  styleUrl: './paymentmethod.component.css'
})
export class PaymentmethodComponent {

  recharegeRequest : Rechargerequest = {} as Rechargerequest;

  constructor(private http : HttpClient,private router : Router,private swal : SweetAlertService) { }

  rimbush(){
    if(this.recharegeRequest.amount === 0){
      this.swal.infoNotification('Kujdes!','Shuma nuk mund te jete 0');
      return;
    }
    if(this.recharegeRequest.amount < 0){
      this.swal.infoNotification('Kujdes!', 'Shuma nuk mund te jete negative');
      return;
    }
    
    this.http.post('http://localhost:8080/api/recharge',this.recharegeRequest,{observe: 'response',responseType:'text'})
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          this.swal.successNotification('Sukses!','Rimbushja u krye me sukses!');
          this.router.navigate(['']);
        }else if(response.status === 400){
          this.swal.failNotification('Gabim!','Rimbushja nuk u krye,gabim te dhenat e kartes!');
        }
        console.log(response);
      },
      error: (error) => {
        if(error.status === 400){
          this.swal.failNotification('Gabim!','Rimbushja nuk u krye,gabim te dhenat e kartes!');
        }
      }
    });
  }
}
