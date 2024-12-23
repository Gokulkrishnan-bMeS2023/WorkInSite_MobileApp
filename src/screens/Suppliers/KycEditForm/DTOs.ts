import {KYCTypes} from '../../clients/DTOs/ClientProps';
import {SupplierDetailsType} from '../DTOs/SupplierDetails';

interface KycEditFormProps extends SupplierDetailsType {
  selectedItem: {id: number; type: KYCTypes; value: string};
}

export type {KycEditFormProps};
