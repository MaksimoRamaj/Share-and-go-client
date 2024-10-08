import { Routes } from '@angular/router';
import { FindTripFormComponent } from './forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { HomepageComponent } from './page/homepage/homepage.component';
import { PostDriveComponent } from './page/driver/post-drive/post-drive.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuardRoleUser } from './authentication/auth-guard.service';
import { DriverprofileComponent } from './page/driver/driverprofile/driverprofile.component';
import { TriplistComponent } from './page/driver/driverprofile/triplist/triplist.component';
import { TripdetailsComponent } from './page/driver/driverprofile/tripdetails/tripdetails.component';
import { PassengerprofileComponent } from './page/passenger/passengerprofile/passengerprofile.component';
import { PtriplistComponent } from './page/passenger/ptriplist/ptriplist.component';
import { Path } from 'leaflet';
import { PreferencesComponent } from './page/driver/preferences/preferences.component';
import { VeturatComponent } from './page/driver/driverprofile/veturat/veturat.component';
import { FindPostComponent } from './forms/find-trip-form/find-post/find-post.component';
import { TripformComponent } from './forms/find-trip-form/tripform/tripform.component';
import { InifintescrolltripsComponent } from './page/passenger/unfilteredtrips/inifintescrolltrips/inifintescrolltrips.component';
import { TripComponent } from './page/passenger/unfilteredtrips/trip/trip.component';
import { SignupComponent } from './page/signup/signup.component';
import { BalanceComponent } from './page/balance/balance/balance.component';
import { SecondpreferencespageComponent } from './page/driver/preferences/secondpreferencespage/secondpreferencespage.component';
import { ActivetripsComponent } from './page/driver/driverprofile/triplist/activetrips/activetrips.component';
import { AdminComponent } from './adminpanel/admin/admin.component';
import { ActivepassengerTripsComponent } from './page/passenger/activetrips/activetrips.component';
import { ProfileComponent } from './page/profile/profile.component';

export const routes: Routes = [
    {
        path: "balance",
        component: BalanceComponent,
    },
    {
        path: "infinte-scroll",
        component: InifintescrolltripsComponent
    },
    {
        path: "reserve-trip/:id",
        component: TripComponent
    },
    {
        path: "",
        component: HomepageComponent,
        children: [
            {
                path: "",
                component: FindPostComponent,  

            },
            {
                path: "find-trip",
                component: TripformComponent,
            }
        ]
    },
    {
        path: "driver",
        component: PostDriveComponent,
        canActivate: [AuthGuardRoleUser],
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
        path: "driver-preferences",
        component: SecondpreferencespageComponent
    },
    {
        path:"passenger",
        component: PassengerprofileComponent,
        children: [
            {   
                path: "",
                component: PtriplistComponent,
            },
            {
                path: "udhetimet-aktive",
                component: ActivepassengerTripsComponent
            }
        ]
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
            },
            {
                path: "veturat",
                component: VeturatComponent
            },
            {
                path: "udhetimet-aktive",
                component: ActivetripsComponent
            }
        ]
    },
    {
        path: "profile/:id",
        component: ProfileComponent,
    },
    {
        path:"admin",
        component: AdminComponent
    },
    {
        path: "sign-up",
        component: SignupComponent
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
