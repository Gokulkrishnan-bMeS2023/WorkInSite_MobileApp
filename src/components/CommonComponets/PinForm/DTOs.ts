interface PinFormProps {
    pin: string;
    setPin: (value: string) => void;
    confirmPin: string;
    setConfirmPin: (value: string) => void;
    error: { pin?: string; confirmPin?: string };
    onSave: () => void;
  }
  
  export type { PinFormProps };