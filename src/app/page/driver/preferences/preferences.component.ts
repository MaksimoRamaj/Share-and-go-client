import { Component } from '@angular/core';
import { PreferenceRequest } from '../../../shared/requests/preferencerequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {

  preferences : PreferenceRequest[] = [];
  hasPreferences = false;
  nextPreference = '';

  constructor(private http : HttpClient,private router : Router) { }

  addPreference() {
    if(this.nextPreference === '') {
      return;
    }
    this.preferences.push({title: this.nextPreference});
    this.nextPreference = '';
  }

  removePreference(toBeRemoved : PreferenceRequest) {
    this.preferences = this.preferences.filter(preference => preference.title !== toBeRemoved.title);
  }

  submitForm(){
      this.http.post('http://localhost:8080/api/preference/choose-preferences', 
        this.preferences).subscribe({
          next: data => {
            alert('Preferencat u ruajten me sukses!');
            this.router.navigate(['driver-profile']);
          },
          error: error => {
            this.router.navigate(['driver/preferences']);
          } 
        }); 
  }

}
