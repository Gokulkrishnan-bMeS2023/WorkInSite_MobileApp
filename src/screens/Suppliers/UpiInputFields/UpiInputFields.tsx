import {UpiTypes} from '../DTOs/SupplierProps';
import {UpiInputFieldProps} from './DTOs';
import {PhoneNumberField} from './PhoneNumberField';
import {UpiIdField} from './UpiIdField';

const UpiInputFields = (props: UpiInputFieldProps) => {
  const {upiType, input, setInput, error} = props;

  // Labels for each UPI type
  const labels: {[key in UpiTypes]: string} = {
    [UpiTypes.GPAY]: 'Enter Gpay number',
    [UpiTypes.PHONEPE]: 'Enter Phonepe number',
    [UpiTypes.UPI_ID]: 'Enter Upi ID',
  };

  const label = labels[upiType]; // Retrieve label for the selected UPI type

  // Components for each UPI type
  const upiComponents: {[key in UpiTypes]: React.ElementType} = {
    [UpiTypes.GPAY]: PhoneNumberField,
    [UpiTypes.PHONEPE]: PhoneNumberField,
    [UpiTypes.UPI_ID]: UpiIdField,
  };

  const UpiComponent = upiComponents[upiType]; // Retrieve component for the selected UPI type

  return (
    UpiComponent && (
      <UpiComponent
        inputValue={input}
        setInputValue={setInput}
        errorMessage={error[upiType.toLowerCase()]}
        placeholder={label}
      />
    )
  );
};

export {UpiInputFields};
