import { Routes } from '@angular/router';
import { FindTripFormComponent } from './forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { HomepageComponent } from './page/homepage/homepage.component';
import { PostDriveComponent } from './page/driver/post-drive/post-drive.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './authentication/auth-guard.service';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
    },
    {
        path: "post-drive",
        component: PostDriveComponent,
        canActivate: [AuthGuard]
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
