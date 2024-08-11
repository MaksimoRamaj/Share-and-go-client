import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  onWaiting = new BehaviorSubject<number>(0);
  onWaiting$ = this.onWaiting.asObservable();
}
