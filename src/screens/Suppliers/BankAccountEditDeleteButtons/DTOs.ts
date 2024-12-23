import {SupplierDetailsType} from '../DTOs/SupplierDetails';
import {BankAccountProps} from '../DTOs/SupplierProps';

interface BankAccountEditDeleteButtonsProp extends SupplierDetailsType {
  selectedItem: {id: number; item: BankAccountProps};
}

export type {BankAccountEditDeleteButtonsProp};
