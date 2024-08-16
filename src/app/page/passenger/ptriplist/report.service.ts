import { Injectable, signal } from '@angular/core';
import { ReportPurpose } from '../../../shared/reporttypes.model';
import { ReportRequest } from '../../../shared/requests/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  isReportOpen = signal(false);

  report : ReportRequest = {
    reportPurpose :  ReportPurpose[1],
  } as ReportRequest;

}
