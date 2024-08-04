export interface TripResponse {
    id: number;
    startCity: string;
    endCity: string;
    date: string; 
    time: string; 
    duration: number;
    distance: number;
    availableSeats: number;
    driverId: number;
  }
  