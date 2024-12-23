import {useState, useCallback} from 'react';
import {useKycValidate} from '../KycValidate/KycValidate';
import {ClientDetailsType} from '../DTOs/ClientDetails';
import {KYCTypes} from '../DTOs/ClientProps';

const useKycCreateForm = (props: ClientDetailsType) => {
  const {clientDetails, setClientDetails} = props;

  const [kycType, setKycType] = useState<KYCTypes | ''>(''); // Store the selected KYC type
  const [input, setInput] = useState(''); // Store the input value (e.g., Aadhaar, PAN, etc.)
  const {error, setError, initialError, validate, kycItems} = useKycValidate(
    input,
    kycType as KYCTypes,
  ); // Handle validation

  const getInputCount = (type: KYCTypes) =>
    clientDetails.kycDetails.filter(item => item.value && item.kycType === type)
      .length;
  const filteredKycItems = kycItems.filter(
    item => getInputCount(item.value) === 0,
  );

  // Handle when a KYC type is selected
  const handleSelectChange = useCallback(
    (value: KYCTypes) => {
      setKycType(value); // Set the selected KYC type
      setError(initialError); // Reset error message
      setInput(''); // Clear the input field
    },
    [setKycType, setError, setInput, initialError],
  );

  const handleAdd = () => {
    if (validate()) {
      setClientDetails(prev => ({
        ...prev,
        kycDetails: [
          ...prev.kycDetails,
          {kycType: kycType as KYCTypes, value: input},
        ],
      }));
      props.Ref?.current.close();
    }
  };

  return {
    kycType,
    kycItems: filteredKycItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  };
};

export {useKycCreateForm};
