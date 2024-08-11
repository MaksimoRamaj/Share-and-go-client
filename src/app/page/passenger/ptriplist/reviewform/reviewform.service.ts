import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewformService {

  constructor() { }

  isOpen = signal(false);
  tripId = signal(-1);
  driverId = signal(-1);

}
