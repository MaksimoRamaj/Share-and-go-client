export interface ReviewResponse {
    reviewId: number;
    reviewerId: number;
    recipientId: number;
    reviewerName: string;
    recipientName: string;
    reviewerProfilePictureUrl: string;
    recipientProfilePictureUrl: string;
    rating: number;
    comment: string;
}
