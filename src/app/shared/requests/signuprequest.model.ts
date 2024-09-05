export interface UserSignUpRequest {
    email: string;
    password: string;
    phoneNumber: string;
    firstname: string;
    lastname: string;
    gender: string;
    birthDate: string;
    mfaEnabled: boolean;
}
