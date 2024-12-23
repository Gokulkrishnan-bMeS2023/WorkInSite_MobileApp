import {useCallback, useState} from 'react';
import {KYCTypes} from '../../clients/DTOs/ClientProps';
import {useKycValidate} from '../../Clients/KycValidate/KycValidate';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';

const useKycCreateForm = (props: WorkerDetailsType) => {
  const {workerDetails, setWorkerDetails} = props;

  const [kycType, setKycType] = useState<KYCTypes | ''>('');
  const [input, setInput] = useState('');
  let {error, setError, initialError, validate, kycItems} = useKycValidate(
    input,
    kycType as KYCTypes,
  );

  const getInputCount = (type: KYCTypes) =>
    workerDetails.kycDetails.filter(item => item.value && item.kycType === type)
      .length;
  kycItems = kycItems.filter(item => getInputCount(item.value) === 0);

  const handleSelectChange = useCallback(
    (value: KYCTypes) => {
      setKycType(value);
      setError(initialError);
      setInput('');
    },
    [setKycType, setError, setInput, initialError],
  );

  const handleAdd = () => {
    if (validate()) {
      setWorkerDetails(prev => ({
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
    kycItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  };
};

export {useKycCreateForm};
