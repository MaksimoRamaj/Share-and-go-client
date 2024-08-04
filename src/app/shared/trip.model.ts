import { BookingType } from "./bookingtype.model";

export interface Trip{
    id?: number;
    startCity: string;
    endCity: string;
    dateOfTrip: string;
    timeOfTrip: string;
    pricePerSeat: number;
    passengerCount: number;
    duration: number;
    distance: number;
}