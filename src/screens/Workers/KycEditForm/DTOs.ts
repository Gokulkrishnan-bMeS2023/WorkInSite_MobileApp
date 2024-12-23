import { KYCTypes } from "../../clients/DTOs/ClientProps";
import { WorkerDetailsType } from "../DTOs/WorkerDetails";


interface KycEditFormProps extends WorkerDetailsType {
  selectedItem: { id: number, type: KYCTypes, value: string };
}

export  type { KycEditFormProps };
