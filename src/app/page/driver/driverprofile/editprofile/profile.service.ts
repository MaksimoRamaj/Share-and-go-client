import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  editMode = signal(false);

  activeTrips = signal(false);

  constructor() { }

  toggleEditMode(){
    this.editMode.set(!this.editMode());
  }
}
