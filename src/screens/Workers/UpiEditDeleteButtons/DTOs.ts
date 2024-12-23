import {UpiDetail} from '../../Suppliers/DTOs/SupplierProps';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';

interface UpiEditDeleteButtonsProp extends WorkerDetailsType {
  selectedItem: {id: number; item: UpiDetail};
}

export type {UpiEditDeleteButtonsProp};
