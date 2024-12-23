import {SupplierDetailsType} from '../DTOs/SupplierDetails';
import {UpiDetail} from '../DTOs/SupplierProps';

interface UpiEditDeleteButtonsProp extends SupplierDetailsType {
  selectedItem: {id: number; item: UpiDetail};
}

export type {UpiEditDeleteButtonsProp};
