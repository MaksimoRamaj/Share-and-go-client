import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawalRequest } from './withdrawrequest.model';
import { FormsModule } from '@angular/forms';
import { WithdrawalResponse } from './withdrawalresponse.model';
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-withdrequest',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './withdrequest.component.html',
  styleUrl: './withdrequest.component.css'
})
export class WithdrequestComponent implements OnInit {

  constructor(private http : HttpClient, private router : Router , private balanceService : BalanceService) { }

 
  withdrawalresponse : WithdrawalResponse[] = [];

  ngOnInit(){
    this.http.get<WithdrawalResponse[]>('http://localhost:8080/api/withdrawal/all-withdrawals')
    .subscribe({
      next: (response) => {
        this.withdrawalresponse = response;
        let total = 0;
        this.withdrawalresponse.forEach((withdrawal) => {
          total = total + withdrawal.amount;
        });
        this.balanceService.onWaiting.next(total);
      }
    });

    

  }

}
