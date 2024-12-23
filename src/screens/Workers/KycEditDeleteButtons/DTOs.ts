import {KYCDetail} from '../../clients/DTOs/ClientProps';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';

interface KycEditDeleteButtonsProp extends WorkerDetailsType {
  selectedItem: {id: number; item: KYCDetail};
}

export type {KycEditDeleteButtonsProp};
