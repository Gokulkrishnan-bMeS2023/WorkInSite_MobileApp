import { ClientDetailsType } from "../DTOs/ClientDetails";
import { KYCDetail } from "../DTOs/ClientProps";


interface ClientEditDeleteButtonsProps extends ClientDetailsType {
  selectedItem: { id: number, item: KYCDetail };
}

export type { ClientEditDeleteButtonsProps };
