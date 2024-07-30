import { Routes } from '@angular/router';
import { FindTripFormComponent } from './forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';
import { HomepageComponent } from './page/homepage/homepage.component';
import { PostDriveComponent } from './page/driver/post-drive/post-drive.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },
    {
        path: "driver/offer-ride",
        component: PostDriveComponent,
    },
];
