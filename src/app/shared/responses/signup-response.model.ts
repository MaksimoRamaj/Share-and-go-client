export interface AdminLoginResponse {
    email?: string;
    token?: string;             
    message?: string;
    expiration?: Date;           
    role?: string;
    mfaEnabled?: boolean;
    secretImageUri?: string;
  }
  