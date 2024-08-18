import { WithdrawalStatus } from "../withdrawalstatus.model";

export interface  WithdrawalResponse {
    id: number;
    withdrawalStatus: WithdrawalStatus;
    accountNumber: string;
    amount: number;
    userId: number;
  }
  