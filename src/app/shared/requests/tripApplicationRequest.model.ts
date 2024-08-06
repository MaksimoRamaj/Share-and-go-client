import { PackageRequest } from "./packagerequest.model";

export interface TripApplicationRequest {
    applicationType: string;
    tripId: number;
    numberOfSeats: number;
    packages: PackageRequest[];
}