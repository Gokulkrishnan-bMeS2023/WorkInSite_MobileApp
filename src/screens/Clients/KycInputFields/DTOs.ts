import { KYCTypes } from "../DTOs/ClientProps";

interface KycInputFieldProps {
  kycType: KYCTypes;
  input: any; 
  setInput: any;  
  error:any;  
}

export type { KycInputFieldProps };