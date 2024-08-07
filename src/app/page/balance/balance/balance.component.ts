import { Component } from '@angular/core';
import { PaymentmethodComponent } from "../paymentmethod/paymentmethod.component";
import { WithdrawMethodComponent } from "../withdraw-method/withdraw-method.component";
import { NavbarComponent } from "../../../navbars/navbar/navbar.component";
import { WithdrequestComponent } from "../withdrequest/withdrequest.component";

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [PaymentmethodComponent, WithdrawMethodComponent, NavbarComponent, WithdrequestComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {

}
