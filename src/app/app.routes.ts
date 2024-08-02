import { Routes } from '@angular/router';
import { FindTripFormComponent } from './forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { HomepageComponent } from './page/homepage/homepage.component';
import { PostDriveComponent } from './page/driver/post-drive/post-drive.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './authentication/auth-guard.service';
import { DriverprofileComponent } from './page/driver/driverprofile/driverprofile.component';
import { TriplistComponent } from './page/driver/driverprofile/triplist/triplist.component';
import { TripdetailsComponent } from './page/driver/driverprofile/tripdetails/tripdetails.component';
import { PassengerprofileComponent } from './page/passenger/passengerprofile/passengerprofile.component';
import { PtriplistComponent } from './page/passenger/ptriplist/ptriplist.component';
import { Path } from 'leaflet';
import { PreferencesComponent } from './page/driver/preferences/preferences.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
    },
    {
        path: "driver",
        component: PostDriveComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                component: OfferDriveFormComponent,
            },
            {   
                path: "preferences",
                component: PreferencesComponent,
            },    
        ]
    },
    {
        path:"passenger",
        component: PassengerprofileComponent,
        children: [
            {   
                path: "",
                component: PtriplistComponent,
            },]
    }
    ,
    {
        path: "driver-profile",
        component: DriverprofileComponent,
        children: [
            {
                path: "",
                component: TriplistComponent,
            },
            {
                path: "trip/:id",
                component: TripdetailsComponent,
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "**",
        component: HomepageComponent,
    },
];
