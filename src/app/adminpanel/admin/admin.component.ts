import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbaradminComponent } from '../adminnav/navbaradmin/navbaradmin.component';
import { FooterComponent } from "../../footer/footer.component";
import { ProfileComponent } from "../profile/profile.component";
import { Router } from '@angular/router';
import { TripserviceService } from '../../page/passenger/unfilteredtrips/trip/tripservice.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ReviewformService } from '../../page/passenger/ptriplist/reviewform.service';
import { TripResponse } from '../../shared/responses/tripresponse.model';
import { PreferenceResponse } from '../../shared/responses/preferenceresponse.model';
import { InfinitescrollserviceService } from '../../page/passenger/unfilteredtrips/inifintescrolltrips/infinitescrollservice.service';
import { City } from '../../shared/city.model';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReviewsComponent } from "../../page/driver/driverprofile/triplist/reviews/reviews.component";
import { WithdrawalsComponent } from "../withdrawals/withdrawals.component";
import { AdminService } from '../admin.service';
import { ReportsComponent } from "../reports/reports.component";

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [CommonModule, NavbaradminComponent, FooterComponent, ProfileComponent, DurationPipe, CurrencyPipe, DatePipe, ReviewsComponent, WithdrawalsComponent, ReportsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(private route: Router,private tripService:TripserviceService, private http : HttpClient
    ,private reviewFormService : ReviewformService, private adminService : AdminService) { }

    reports = this.adminService.reports;
    
    toggleReports(){
        this.adminService.reports.set(!this.adminService.reports());
    }

    ngOnInit(): void {
      
    }

    
    
}

