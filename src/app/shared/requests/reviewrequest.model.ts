export interface ReviewRequest {
    recipientId: number;
    tripId: number;
    rating: number;
    comment: string;
}