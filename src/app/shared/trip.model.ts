import { BookingType } from "./bookingtype.model";

export interface Trip{
    id?: number;
    fromCity: string;
    toCity: string;
    dateOfTrip: string;
    timeOfTrip: string;
    bookingType: string;
    passengerCount: number;
    duration: number;
    distance: number;
    cmimi: number;
}