import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawalRequest } from '../withdrequest/withdrawrequest.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdraw-method',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './withdraw-method.component.html',
  styleUrl: './withdraw-method.component.css'
})
export class WithdrawMethodComponent {

  constructor(private http : HttpClient, private router : Router ) { }

  withdrawalRequest  : WithdrawalRequest= {
    amount: 0,
    accountNumber: ''
  };

  makeRequest(){

    if(this.withdrawalRequest.amount === 0){
      alert('Shuma nuk mund te jete 0');
      return;
    }
    if(this.withdrawalRequest.amount < 0){
      alert('Shuma nuk mund te jete negative');
      return;
    }
    if(this.withdrawalRequest.amount < 1000){
      alert('Minimumi i lejuar per terheqje eshte 1000 leke');
      return;
    }
    if(this.withdrawalRequest.accountNumber === ''){
      alert('Ju lutem vendosni nje llogari valide');
      return;
    }

    this.http.post('http://localhost:8080/api/withdrawal/withdraw',
      this.withdrawalRequest,{observe: 'response'})
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          alert('Kerkesa u dergua me sukses!');
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        if(error.status === 200){
          alert('Kerkesa u dergua me sukses!');
          this.router.navigate(['']);
        }
      }
    });
  }

}
