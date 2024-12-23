import {useUpiValidate} from '../../Suppliers/UpiValidate/UpiValidate';
import {UpiEditFormProps} from './DTOs';
import {useState} from 'react';

const useUpiEditForm = (props: UpiEditFormProps) => {
  const {workerDetails, setWorkerDetails, selectedItem} = props;

  const upiType = selectedItem.type;
  const [input, setInput] = useState(selectedItem.value);
  const {error, validate, upiItems} = useUpiValidate(input, upiType);

  const handleUpdate = () => {
    if (validate()) {
      const updatedUpiDetails = workerDetails.upiDetails.map((item, index) =>
        index === selectedItem.id ? {upiType, value: input} : item,
      );
      setWorkerDetails(prev => ({...prev, upiDetails: [...updatedUpiDetails]}));
      props.Ref?.current.close();
    }
  };

  return {upiType, upiItems, input, setInput, error, handleUpdate};
};

export {useUpiEditForm};
