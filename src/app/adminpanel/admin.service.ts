import { Injectable, signal } from '@angular/core';
import { AdminResponse } from './model/adminresponse.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  reports = signal(true);

  fetchWithdrawals(){
   return this.http.get('http://localhost:8080/api/withdrawal/admin/pending-withdrawals',{observe: 'response'});
  }

  acceptWithdrawal(id: number){
    return this.http.put('http://localhost:8080/api/withdrawal/admin/confirm-withdrawal?id='+id,null,{observe: 'response',responseType: 'text'});
  }

  rejectWithdrawal(id: number){
    return this.http.put('http://localhost:8080/api/withdrawal/admin/reject-withdrawal?id='+id,null,{observe: 'response',responseType: 'text'});
  }


}
