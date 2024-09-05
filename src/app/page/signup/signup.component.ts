import { Component, signal } from '@angular/core';
import { UserSignUpRequest } from '../../shared/requests/signuprequest.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../../sweet-alert/sweet-alert-service.service';
import { AdminLoginResponse } from '../../shared/responses/signup-response.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  mfaEnabled = signal(false);
  adminLoginResponse : AdminLoginResponse = {};
  otpCode = '';
  message = '';

  signUpRequest : UserSignUpRequest = {
    email: 'test@example.com',
    password: 'Test@1234',
    phoneNumber: '3551234567',
    firstname: 'John',
    lastname: 'Doe',
    gender: 'Male',
    birthDate: '1990-01-01',
    mfaEnabled: false,
  };

  constructor(private http : HttpClient, private router : Router,private swal : SweetAlertService,
    private authService : AuthService
  ) { }
    
  register(){
    this.http.post('http://localhost:8080/api/user/sign-up', this.signUpRequest,{observe: 'response',responseType:'text'})
    .subscribe({
      next: (response) => {
       if(response.status === 200){        
        const responseBody = JSON.parse(response.body!);
          
                    if (responseBody.mfaEnabled) {
                        if (responseBody.mfaEnabled) {
                            this.mfaEnabled = signal(true);
                            this.adminLoginResponse = responseBody;
                        } else {
                            this.router.navigate(['login']);
                        }
                    }
       }
       if(response.status === 400){
        this.swal.failNotification('Gabim!',''+ response.body);
       }
      },
      error: (error) => {
        this.swal.failNotification('Gabim!', 'Regjistrimi nuk u krye, provoni perseri!');   
    }});
  }
  
  verifyTfa() {
    const verifyRequest: {email : string,code : string} = {
      email : this.adminLoginResponse.email || ' ',
      code: this.otpCode
    };
    this.http.post
    (`http://localhost:8080/api/verify`, verifyRequest,{observe: 'response',responseType:'text'})
      .subscribe({
        next: (response) => {
          if(response.status === 200){
            const responseBody = JSON.parse(response.body!);
            console.log(responseBody.body);
            console.log(responseBody.token);
              this.authService.login(responseBody.body.token!,responseBody.body.role!);
              localStorage.setItem('loginToken', responseBody.body.token!);
              localStorage.setItem('role',responseBody.body.role!);
              console.log(responseBody.token);
              if (responseBody.body.role == 'ADMIN' || responseBody.body.role == 'SUPERADMIN') {
                console.log('Admin login');
                this.router.navigate(['/admin']);
              }
              else{
              // localStorage.setItem('loginToken', response.body.token);
              // this.authService.login();
              this.router.navigate(['/']);
              } 
            }
          }
        },
      );
  }

}

function isAdminLoginResponse(response: any): response is AdminLoginResponse {
  return typeof response.token === 'string' &&
         typeof response.message === 'string' &&
         response.expiration instanceof Date &&
         typeof response.role === 'string' &&
         typeof response.mfaEnabled === 'boolean' &&
         (typeof response.secretImageUri === 'string' || response.secretImageUri === undefined);
}

