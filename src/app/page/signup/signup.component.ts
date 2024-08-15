import { Component } from '@angular/core';
import { UserSignUpRequest } from '../../shared/requests/signuprequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpRequest : UserSignUpRequest = {
    email: 'test@example.com',
    password: 'Test@1234',
    phoneNumber: '3551234567',
    firstname: 'John',
    lastname: 'Doe',
    gender: 'Male',
    birthDate: '1990-01-01',
  };

  constructor(private http : HttpClient, private router : Router,private swal : SweetAlertService) { }
    
  register(){
    this.http.post('http://localhost:8080/api/user/sign-up', this.signUpRequest,{observe: 'response',responseType:'text'})
    .subscribe({
      next: (response) => {
       if(response.status === 200){
        this.router.navigate(['login']);
       }
       if(response.status === 400){
        this.swal.failNotification('Gabim!',''+ response.body);
       }
      },
      error: (error) => {
        this.swal.failNotification('Gabim!', 'Regjistrimi nuk u krye, provoni perseri!');   
    }});
  }
}
