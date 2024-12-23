import { KYCDetail } from "../../../screens/clients/DTOs/ClientProps";
import { SupplierDetailsType } from "../../../screens/Suppliers/DTOs/SupplierDetails";

interface KycEditDeleteButtonsProp extends SupplierDetailsType {
  selectedItem: { id: number, item: KYCDetail };
}

export type { KycEditDeleteButtonsProp };
