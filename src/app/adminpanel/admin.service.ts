import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  reports = signal(true);
}
