enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

// Define the structure of each KYC item
interface KYCDetail {
  id?: number; //note
  kycType: KYCTypes;
  //   type?: KYCTypes; // This can be something like 'PAN', 'Aadhaar', etc.
  value: string; // The value of the KYC item
}

// Define the structure for the `details` (could be `clientDetails`, `workerDetails`, or `supplierDetails`)
interface KycDetails {
  kycDetails: KYCDetail[];
}

// Define the interface for the `selectedItem` that will be edited
interface SelectedItem {
  id: number;
  type: KYCTypes;
  value: string;
}

interface KycTypesProps {
  details: KycDetails; // The full details (client, worker, supplier)
  setDetails: React.Dispatch<React.SetStateAction<KycDetails>>; // Function to update the details
  Ref?: any; //note
}

// Define the `KycEditFormProps` interface

interface KycEditFormProps extends KycTypesProps {
  selectedItem: SelectedItem; // The selected item to edit
  Ref?: React.RefObject<any>; // Optional reference (e.g., for closing a modal)
}

export {KYCTypes};
export type {
  KycTypesProps,
  KycEditFormProps,
  KycDetails,
  KYCDetail,
  SelectedItem,
};
