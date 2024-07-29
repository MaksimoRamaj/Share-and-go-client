import { Routes } from '@angular/router';
import { FindTripFormComponent } from './forms/find-trip-form/find-trip-form.component';
import { OfferDriveFormComponent } from './forms/offer-drive-form/offer-drive-form.component';

export const routes: Routes = [
    {
        path: "",
        component: FindTripFormComponent
    },
    {
        path: "driver/offer-ride",
        component: OfferDriveFormComponent,
    },
];
