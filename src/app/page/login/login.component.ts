import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { SweetAlertService } from '../../../sweet-alert/sweet-alert-service.service';
import { CommonModule } from '@angular/common';
import { AdminLoginResponse } from '../../shared/responses/signup-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    mfaEnabled = signal(false);
    otpCode = '';
    adminLoginResponse : AdminLoginResponse = {};

    loginObj: any = {
      email : '',
      password  : ''
    }

    constructor(private swal : SweetAlertService,
      private http: HttpClient,private router : Router,private authService : AuthService) {}

    onLogin() {
      this.http.post('http://localhost:8080/api/user/login', this.loginObj,{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          this.adminLoginResponse = response.body;
          if(response.status === 401){
            this.swal.infoNotification("Kujdes!",'Kredencialet jane gabim!');
          }else if(response.status === 404){
            this.swal.infoNotification("Kujdes!",'Te dhenat per userin nuk u gjeten ose fushat e paplotesuara!');
          }
          else if(response.status === 200 && (!response.body.mfaEnabled)){
            this.authService.login(response.body.token,response.body.role);
            localStorage.setItem('loginToken', response.body.token);
            localStorage.setItem('role',response.body.role);
            if (response.body.role == 'ADMIN' || response.body.role == 'SUPERADMIN') {
              console.log('Admin login');
              this.router.navigate(['/admin']);
            }
            else{
            // localStorage.setItem('loginToken', response.body.token);
            // this.authService.login();
            this.router.navigate(['/']);
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error submitting trip details', error);
          this.swal.infoNotification("Kujdes!", ""+error.status);  // Accessing the status code in case of error
        }
      });
    }

    signUp(){
      this.router.navigate(['sign-up']);
  }

  verifyCode() {
    const verifyRequest: {email:string,code:string} = {
      email: this.loginObj.email,
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
