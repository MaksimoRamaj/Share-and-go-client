export interface ProfileUpdateRequest {
    phoneNumber?: string;
    oldPassword?: string;
    newPassword?: string;
    newConfirmPassword?: string;
    firstname?: string;
    lastname?: string;
    newProfilePicture?: File;
    birthDate?: string;
}