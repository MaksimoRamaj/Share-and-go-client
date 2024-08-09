import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  editMode = signal(false);

  constructor() { }

  toggleEditMode(){
    this.editMode.set(!this.editMode());
  }
}
