import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent {

  constructor(private profileService : ProfileService) { }

  editMode = this.profileService.editMode;  

  toggleEditMode(){
    this.profileService.toggleEditMode();
  }

}
