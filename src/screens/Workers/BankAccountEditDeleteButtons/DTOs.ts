import {BankAccountProps} from '../../Suppliers/DTOs/SupplierProps';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';

interface BankAccountEditDeleteButtonsProp extends WorkerDetailsType {
  selectedItem: {id: number; item: BankAccountProps};
}

export type {BankAccountEditDeleteButtonsProp};
