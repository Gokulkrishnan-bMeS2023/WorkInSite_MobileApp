import { KYCTypes } from "../../../screens/clients/DTOs/ClientProps";

interface KycInputFieldProps {
  kycType: KYCTypes;
  input: string;
  setInput: React.Dispatch<string>;
  error: { [key: string]: string };
}

export type { KycInputFieldProps };
