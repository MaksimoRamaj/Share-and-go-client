import { Component } from '@angular/core';
import { UserSignUpRequest } from '../../shared/requests/signuprequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private http : HttpClient, private router : Router) { }
    
  register(){
    this.http.post('http://localhost:8080/api/user/sign-up', this.signUpRequest)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log(error);   
    }});
  }
}
