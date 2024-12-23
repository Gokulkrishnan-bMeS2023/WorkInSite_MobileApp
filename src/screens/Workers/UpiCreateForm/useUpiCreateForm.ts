import {useCallback, useState} from 'react';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';
import {UpiTypes} from '../../Suppliers/DTOs/SupplierProps';
import {useUpiValidate} from '../../Suppliers/UpiValidate/UpiValidate';

const useUpiCreateForm = (props: WorkerDetailsType) => {
  const {workerDetails, setWorkerDetails} = props;

  const [upiType, setUpiType] = useState<UpiTypes | ''>('');
  const [input, setInput] = useState('');
  let {error, setError, initialError, validate, upiItems} = useUpiValidate(
    input,
    upiType as UpiTypes,
  );

  const getInputCount = (type: UpiTypes) =>
    workerDetails.upiDetails.filter(item => item.value && item.upiType === type)
      .length;
  upiItems = upiItems.filter(item => getInputCount(item.value) === 0);

  const handleSelectChange = useCallback(
    (value: UpiTypes) => {
      setUpiType(value);
      setError(initialError);
      setInput('');
    },
    [setUpiType, setError, setInput, initialError],
  );

  const handleAdd = () => {
    if (validate()) {
      setWorkerDetails(prev => ({
        ...prev,
        upiDetails: [
          ...prev.upiDetails,
          {upiType: upiType as UpiTypes, value: input},
        ],
      }));
      props.Ref?.current.close();
    }
  };

  return {
    upiType,
    upiItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  };
};

export {useUpiCreateForm};
