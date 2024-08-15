import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { userprofile } from '../../shared/responses/userresponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  showProfile = signal(false);
  userId = signal(-1);

  constructor(private http : HttpClient) { }

  getUserProfile() : Observable<HttpResponse<string>>{
    return this.http.get(`http://localhost:8080/api/user/auth-user`,{observe: 'response',responseType: 'text'});
  }

}
