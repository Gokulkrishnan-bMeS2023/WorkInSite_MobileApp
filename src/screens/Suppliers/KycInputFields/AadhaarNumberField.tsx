import {Input} from '../../../components/CommonComponets';

interface InputPropTypes {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  inputValue: string;
  handleInputChange: (value: string) => void;
  required?: boolean;
}
const AadhaarNumberField = (props: InputPropTypes) => {
  const {
    label,
    errorMessage,
    placeholder,
    isDisabled,
    inputValue,
    handleInputChange,
    required = false,
  } = props;
  return (
    <Input
      errorMessage={errorMessage}
      title={label}
      value={inputValue}
      onChangeText={handleInputChange}
      // regex={/^\d*$/}
      maxLength={12}
      placeholder={placeholder || 'Enter Aadhaar number'}
      disabled={isDisabled}
      required={required}
      inputType='numeric'
    />
  );
};

export {AadhaarNumberField};
