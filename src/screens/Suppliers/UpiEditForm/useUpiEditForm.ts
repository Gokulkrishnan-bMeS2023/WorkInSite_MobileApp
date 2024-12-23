import {useUpiValidate} from '../UpiValidate/UpiValidate';
import {UpiEditFormProps} from './DTOs';
import {useState} from 'react';

const useUpiEditForm = (props: UpiEditFormProps) => {
  const {supplierDetails, setSupplierDetails, selectedItem} = props;

  const upiType = selectedItem.type;
  const [input, setInput] = useState(selectedItem.value);
  const {error, validate, upiItems} = useUpiValidate(input, upiType);

  const handleUpdate = () => {
    if (validate()) {
      const updatedUpiDetails = supplierDetails.upiDetails.map((item, index) =>
        index === selectedItem.id ? {upiType, value: input} : item,
      );
      setSupplierDetails(prev => ({
        ...prev,
        upiDetails: [...updatedUpiDetails],
      }));
    }
    props.Ref?.current.close();
  };

  return {upiType, upiItems, input, setInput, error, handleUpdate};
};

export {useUpiEditForm};
