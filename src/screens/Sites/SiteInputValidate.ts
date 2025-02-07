import { useState } from "react";

interface SiteInputValidateProps {
    name: string;
    clientId: string;
    googleLocation: string;
    contactId: string;
  }
  
const useSiteInputValidate = (props: SiteInputValidateProps) => {
  const { name, clientId, googleLocation, contactId } = props;

  const initialError = { name: "", client: "", googleLocation: "", contact: "", supervisor: "" };
  const [error, setError] = useState(initialError);

  const resetErrors = () => setError(initialError);

  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError((prev) => ({ ...prev, [field]: message }));
      isValid = false;
    };

    if (!name) updateError("name", "Please enter name");
    if (name && (name.length < 2 || !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(name))) updateError("name", "Invalid name");
    if (!clientId) updateError("client", "Please select client");
    if (!googleLocation) updateError("googleLocation", "Please enter google location");
    if (!contactId) updateError("contact", "Please select contact");

    return isValid;
  };

  return { error, validate,setError,initialError };
};

export { useSiteInputValidate };
