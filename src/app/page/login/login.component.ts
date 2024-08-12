import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
    loginObj: any = {
      email : '',
      password  : ''
    }

    constructor(private http: HttpClient,private router : Router,private authService : AuthService) {}

    onLogin() {
      this.http.post('http://localhost:8080/api/user/login', this.loginObj,{observe: 'response'}).subscribe({
        next: (response: HttpResponse<any>) => {
          if(response.status === 401){
            alert('Kredencialet jane gabim!');
          }else if(response.status === 404){
            alert('Te dhenat per userin nuk u gjeten ose fushat e paplotesuara!');
          }
          else if(response.status === 200){
            this.authService.login(response.body.token,response.body.role);
            localStorage.setItem('loginToken', response.body.token);
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
          console.log('Status Code:', error.status);  // Accessing the status code in case of error
        }
      });
    }

}
