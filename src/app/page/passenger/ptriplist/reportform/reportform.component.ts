import { Component } from '@angular/core';
import { ReviewRequest } from '../../../../shared/requests/reviewrequest.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReportRequest } from '../../../../shared/requests/report.model';
import { ReportPurpose } from '../../../../shared/reporttypes.model';
import { CommonModule } from '@angular/common';
import { ReportService } from '../report.service';
import { SweetAlertService } from '../../../../../sweet-alert/sweet-alert-service.service';

@Component({
  selector: 'app-reportform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reportform.component.html',
  styleUrl: './reportform.component.css'
})
export class ReportformComponent {

  report : ReportRequest = this.reportService.report;

  constructor(private http : HttpClient,private reportService : ReportService,
    private swal : SweetAlertService
  ) { }

  options = ReportPurpose;

  toggle(){
    this.reportService.isReportOpen.set(false);
  }

  dergo(){
    console.log(this.report);
    this.http.post('http://localhost:8080/api/feedback/report/create-report',this.report
    ,{observe: 'response',responseType: 'text'}).subscribe({
      next: (response) => {
        if(response.status == 200){
          this.swal.infoNotification('Informacion','Reporti u dergua me sukses!');
          this.toggle();
        }
        if(response.status == 409){
          this.swal.infoNotification('Informacion','Ju keni raportuar me pare!');
          this.toggle();
        }
      },
      error: (response) => {
        if(response.status == 409){
          this.swal.infoNotification('Informacion','Ju keni raportuar me pare!');
          this.toggle();
        }
      },
    });
     
  }

}
