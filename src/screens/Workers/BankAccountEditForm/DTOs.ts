import {WorkerDetailsType} from '../DTOs/WorkerDetails';

interface BankAccountEditFormProps extends WorkerDetailsType {
  selectedItem: {
    id: number;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
  };
}

export type {BankAccountEditFormProps};
