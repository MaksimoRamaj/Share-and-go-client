import { ApplicationStatus } from "../applicationstatus.model";
import { ApplicationType } from "../applicationtype.model";

export interface TripApplicationResponse {
    id: number;
    tripId ?: number;
    applicationType: ApplicationType;
    status: ApplicationStatus;
    numberOfSeats: number;
    applicantId: number;
    applicantFirstname: string;
    applicantLastname: string;
    applicantProfilePictureUrl: string;
}
