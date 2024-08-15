import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawalRequest } from '../withdrequest/withdrawrequest.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-withdraw-method',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './withdraw-method.component.html',
  styleUrl: './withdraw-method.component.css'
})
export class WithdrawMethodComponent {

  constructor(private http : HttpClient, private router : Router ,private swal : SweetAlertService) { }

  withdrawalRequest  : WithdrawalRequest= {
    amount: 0,
    accountNumber: ''
  };

  makeRequest(){

    if(this.withdrawalRequest.amount === 0){
     this.swal.infoNotification('Info','Shuma nuk mund te jete 0');
      return;
    }
    if(this.withdrawalRequest.amount < 0){
      this.swal.infoNotification('Info','Shuma nuk mund te jete negative');
      return;
    }
    if(this.withdrawalRequest.amount < 1000){
      this.swal.infoNotification('Info','Minimumi i lejuar per terheqje eshte 1000 leke');
      return;
    }
    if(this.withdrawalRequest.accountNumber === ''){
     this.swal.infoNotification('Info','Ju lutem vendosni nje llogari valide');
      return;
    }

    this.http.post('http://localhost:8080/api/withdrawal/withdraw',
      this.withdrawalRequest,{observe: 'response',responseType:'text'})
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          this.swal.infoNotification('Sukses!','Kerkesa u dergua me sukses!');
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.log(error);}
    });
  }

}
