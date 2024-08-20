import { Component, inject, signal } from '@angular/core';
import { NavbaradminComponent } from '../adminnav/navbaradmin/navbaradmin.component';
import { FooterComponent } from "../../footer/footer.component";
import { ProfileComponent } from "../profile/profile.component";
import { Router } from '@angular/router';
import { TripserviceService } from '../../page/passenger/unfilteredtrips/trip/tripservice.service';
import { HttpClient } from '@angular/common/http';
import { ReviewformService } from '../../page/passenger/ptriplist/reviewform.service';
import { TripResponse } from '../../shared/responses/tripresponse.model';
import { PreferenceResponse } from '../../shared/responses/preferenceresponse.model';
import { InfinitescrollserviceService } from '../../page/passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { City } from '../../shared/city.model';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportResponse } from '../../shared/responses/report-response.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbaradminComponent, FooterComponent, ProfileComponent, DurationPipe, CurrencyPipe, DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  private date = new Date();
  
  ReportResponses ?: ReportResponse[] = undefined;

  fromDate : string = this.date.toISOString().split('T')[0];
  toDate : string = new Date(this.date.setMonth(this.date.getMonth() + 1)).toISOString().split('T')[0];

  constructor(private route: Router,private tripService:TripserviceService, private http : HttpClient
    ,private reviewFormService : ReviewformService) { }

  ngOnInit() {
    this.fetchReports();
  }

  onDateChange(event : any){
    this.fetchReports();
    console.log(this.ReportResponses);
  }

  fetchReports(){
    this.http.get<ReportResponse[]>('http://localhost:8080/api/feedback/admin/report/un-checked?begin='+this.fromDate+'&end='+this.toDate,
      {observe: 'response',}
    )
    .subscribe(
      {
        next: response => {
          if(response.status == 200 && response.body != null){
          this.ReportResponses = response.body;
          }
          if(response.status == 204){
            this.ReportResponses = [];
          }
        },
        error: error => {
          console.error('There was an error!', error);
      }
    });
  }

  showMore(tripId : number){
      
  }

  showLess(){
   
  }

  onScroll() {
    
  }

  loadMore() {
  
  }

  showReviewForm(tripId : number,driverId : number){
    
  }

}


