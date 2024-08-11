import { Component, OnInit, signal } from '@angular/core';
import { PaymentmethodComponent } from "../paymentmethod/paymentmethod.component";
import { WithdrawMethodComponent } from "../withdraw-method/withdraw-method.component";
import { NavbarComponent } from "../../../navbars/navbar/navbar.component";
import { WithdrequestComponent } from "../withdrequest/withdrequest.component";
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [PaymentmethodComponent, WithdrawMethodComponent, NavbarComponent, WithdrequestComponent,CurrencyPipe],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {


  onWaiting$ = this.balanceService.onWaiting$;

  onWaitingTotal = signal<number>(0);

  constructor(private http : HttpClient,private balanceService : BalanceService) { }

  accountBalance : number = JSON.parse(localStorage.getItem('userprofile')!).accountBalance;

  ngOnInit(): void {
   
    this.onWaiting$.subscribe((value) => {
      this.onWaitingTotal.set(value);
    });

  }

}
