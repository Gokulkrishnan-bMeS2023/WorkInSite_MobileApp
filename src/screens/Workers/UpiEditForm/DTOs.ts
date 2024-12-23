import { UpiTypes } from "../../Suppliers/DTOs/SupplierProps";
import { WorkerDetailsType } from "../DTOs/WorkerDetails";

interface UpiEditFormProps extends WorkerDetailsType {
  selectedItem: { id: number, type: UpiTypes, value: string };
}

export type { UpiEditFormProps };
