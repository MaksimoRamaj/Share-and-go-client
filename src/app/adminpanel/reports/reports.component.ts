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
import { ReportTypes } from '../../shared/report-types.model';
import { reportNote } from '../../shared/report-note.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbaradminComponent, FooterComponent, ProfileComponent, DurationPipe, CurrencyPipe, DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {


  private date = new Date();
  openNotes = signal(false);  
  reportNotes : reportNote[] = [
    {
      reportNoteId: 1,
      reportNote: 'Shoferi nuk vendosi rripin e sigurimit dhe ishte i pa sjellshëm me pasagjerët.',
      createdDate: '2024-08-25T10:45:00',
      reportedUserId: 7,
      reportedUserName: 'Mario Doe',
      reporterUserSurname: 'Ramaj',
      reporterUserTotalReports: 3,
      reportPurpose: 'Mosrespektimi i rregullave të sigurisë dhe sjellja e keqe.'
    },
    {
      reportNoteId: 2,
      reportNote: 'Udhëtoi me shpejtësi të madhe dhe përdori telefonin gjatë vozitjes.',
      createdDate: '2024-09-01T14:30:00',
      reportedUserId: 7,
      reportedUserName: 'Mario Doe',
      reporterUserSurname: 'Shehu',
      reporterUserTotalReports: 5,
      reportPurpose: 'Shpejtësi e tepruar dhe përdorimi i telefonit gjatë vozitjes.'
    },
    {
      reportNoteId: 3,
      reportNote: 'Nuk mbërriti në kohë në destinacionin e caktuar.',
      createdDate: '2024-09-10T09:15:00',
      reportedUserId: 7,
      reportedUserName: 'Mario Doe',
      reporterUserSurname: 'Meta',
      reporterUserTotalReports: 4,
      reportPurpose: 'Vonese në mbërritje.'
    }
  ];
  
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

  formatResponsePurpose(purpose : ReportTypes){
    if(purpose === ReportTypes.LATE_ARRIVAL){
      return 'Vonese ne mberritje ose ne nisje!';
    }else if(purpose === ReportTypes.NO_SHOW){
      return 'Nuk u paraqit!';
    }
    else if(purpose === ReportTypes.PAYMENT_ISSUES){
      return 'Probleme me pagesen!';
    }
    else if(purpose === ReportTypes.ROUTE_CHANGE){
      return 'Ndryshim i rruges!';
    }
    else if(purpose === ReportTypes.RUDE_BEHAVIOR){
      return 'Dhune verbale ose sjellje e keqe!';
    }
    else if(purpose === ReportTypes.SUBSTANCE_USE){
      return 'Perdorim i substancave narkotike!';
    }
    else if(purpose === ReportTypes.UNAPPROVED_STOPS){
      return 'Ndalime te shpeshta pa arsye!';
    }
    else if(purpose === ReportTypes.UNSAFE_DRIVING){
      return 'Vozitje e papergjegjshme!';
    }

    return 'Dicka tjeter!';
  }

  shikoShenimet(recipientId : number){
      this.openNotes.set(true);
  }

  mbyllShenimet(){
    this.openNotes.set(false);
  }

  showMore(tripId : number){
      
  }

  bllokoPerdoruesin(){
   
  }

  lerShenim(){
  }

  onScroll() {
    
  }

  loadMore() {
  
  }

  showReviewForm(tripId : number,driverId : number){
    
  }

}


