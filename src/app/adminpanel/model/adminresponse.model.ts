import { profile } from "../../shared/responses/profileresponse";
import { Role } from "../../shared/role.model";


export interface AdminResponse {
  phoneNumber: string;
  accountBalance: number;
  email: string;
  nid: string;
  salary: number;
  role: Role;
  createdAt: Date; 
  profile: profile;
}
