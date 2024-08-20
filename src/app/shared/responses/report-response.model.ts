import { ReportTypes } from "../report-types.model";

export interface ReportResponse {
    reportId: number;
    reporterId: number;
    recipientId: number;
    reporterName: string;
    recipientName: string;
    reporterProfilePictureUrl: string;
    recipientProfilePictureUrl: string;
    reportPurpose: ReportTypes;
    description: string;
}