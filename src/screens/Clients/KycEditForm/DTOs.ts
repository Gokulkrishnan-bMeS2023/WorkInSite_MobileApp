import {ClientDetailsType} from '../DTOs/ClientDetails';
import {KYCTypes} from '../DTOs/ClientProps';

interface ClientEditFormProps extends ClientDetailsType {
  selectedItem: {id: number; type: KYCTypes; value: string};
  Ref?: React.MutableRefObject<any>;
}

export type {ClientEditFormProps};
