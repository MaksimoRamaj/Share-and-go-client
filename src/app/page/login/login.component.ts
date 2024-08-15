import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { SweetAlertService } from '../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
    loginObj: any = {
      email : '',
      password  : ''
    }

    constructor(private swal : SweetAlertService,
      private http: HttpClient,private router : Router,private authService : AuthService) {}

    onLogin() {
      this.http.post('http://localhost:8080/api/user/login', this.loginObj,{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 401){
            this.swal.infoNotification("Kujdes!",'Kredencialet jane gabim!');
          }else if(response.status === 404){
            this.swal.infoNotification("Kujdes!",'Te dhenat per userin nuk u gjeten ose fushat e paplotesuara!');
          }
          else if(response.status === 200){
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

}
