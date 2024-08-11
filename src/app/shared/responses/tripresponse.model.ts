export interface TripResponse {
    id: number;
    startCity: string;
    endCity: string;
    date: string; 
    time: string; 
    pricePerSeat: number;
    duration: number;
    distance: number;
    availableSeats: number;
    totalSeats: number;
    driverId: number;
    driverFirstname: string;
    driverLastname: string;
    driverProfilePictureURL: string;
    carId ?: number;
  }
  