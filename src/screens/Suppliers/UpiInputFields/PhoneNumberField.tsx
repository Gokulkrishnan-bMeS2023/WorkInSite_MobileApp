import {Input} from '../../../components/CommonComponets';

interface InputPropTypes {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  required?: boolean;
  length?: number;
}

export const PhoneNumberField = (props: InputPropTypes) => {
  const {
    label,
    length = 10,
    errorMessage,
    placeholder,
    isDisabled,
    inputValue,
    setInputValue,
    required = false,
  } = props;

  return (
    <Input
      errorMessage={errorMessage}
      title={label}
      value={inputValue}
      onChangeText={setInputValue}
      // regex="^\d*$"
      maxLength={length}
      placeholder={placeholder || 'Enter phone number'}
      disabled={isDisabled}
      required={required}
      inputType={'numeric'}
    />
  );
};
