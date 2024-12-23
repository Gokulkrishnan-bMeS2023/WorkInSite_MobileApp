
import { useKycValidate } from "../KycValidate/KycValidate";
import { useState } from "react";
import { ClientEditFormProps } from "./DTOs";

const useKycEditForm = (props: ClientEditFormProps) => {
  const { clientDetails, setClientDetails, selectedItem } = props;

  const kycType = (selectedItem.type);
  const [input, setInput] = useState(selectedItem.value);
  const { error, validate, kycItems } = useKycValidate(input, kycType);

  const handleUpdate = () => {
    if (validate()) {
      const updatedKycDetails = clientDetails.kycDetails.map((item, index) => index === selectedItem.id ? { kycType, value: input } : item)
      setClientDetails((prev) => ({...prev, kycDetails: [...updatedKycDetails]}));
      props.Ref?.current.close();
    }
  };

  return { kycType, kycItems, input, setInput, error, handleUpdate };
};

export { useKycEditForm };
