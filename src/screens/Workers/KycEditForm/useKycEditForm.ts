import {useKycValidate} from '../../Clients/KycValidate/KycValidate';
import {KycEditFormProps} from './DTOs';
import {useState} from 'react';

const useKycEditForm = (props: KycEditFormProps) => {
  const {workerDetails, setWorkerDetails, selectedItem} = props;

  const kycType = selectedItem.type;
  const [input, setInput] = useState(selectedItem.value);
  const {error, validate, kycItems} = useKycValidate(input, kycType);

  const handleUpdate = () => {
    if (validate()) {
      const updatedKycDetails = workerDetails.kycDetails.map((item, index) =>
        index === selectedItem.id ? {kycType, value: input} : item,
      );
      setWorkerDetails(prev => ({...prev, kycDetails: [...updatedKycDetails]}));
    }
    props.Ref?.current.close();
  };

  return {kycType, kycItems, input, setInput, error, handleUpdate};
};

export {useKycEditForm};
