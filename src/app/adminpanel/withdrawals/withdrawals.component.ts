import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { WithdrawalResponse } from '../../shared/responses/withdrawal-response.model';
import { AdminService } from '../admin.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-withdrawals',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './withdrawals.component.html',
  styleUrl: './withdrawals.component.css'
})
export class WithdrawalsComponent implements OnInit {

  badge = "Pending";
  withdrawalresponses : WithdrawalResponse[] = [];
  showList = signal(true);  

  update = new BehaviorSubject<boolean>(true);
  update$ = this.update.asObservable();

  constructor(private adminService : AdminService) { }
  

  ngOnInit(): void {

    this.update$.subscribe((data) => {
      if(data == true){
      this.adminService.fetchWithdrawals().subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 200 || response.status === 204){
            this.withdrawalresponses = response.body;
            this.update.next(false);
            console.log(this.withdrawalresponses + "Withdrawals fetched successfully length" + this.withdrawalresponses.length);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Status Code:', error.status); 
        },
  
      });}
    });
  }

  accept(id : number){
    this.adminService.acceptWithdrawal(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status === 200 || response.status === 204
        ){
          this.update.next(true);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Status Code:', error.status); 
      },

    });

  }

  reject(id : number){
    this.adminService.rejectWithdrawal(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status === 200 || response.status === 204){
          this.update.next(true);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Status Code:', error.status);
  }});
}

 onScroll(){
    console.log('Scrolled');
  }


}
