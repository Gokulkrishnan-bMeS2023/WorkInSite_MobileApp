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
const UpiIdField = (props: InputPropTypes) => {
  const {
    label,
    errorMessage,
    placeholder,
    isDisabled,
    required = false,
    inputValue,
    setInputValue,
  } = props;
  return (
    <Input
      errorMessage={errorMessage}
      title={label}
      value={inputValue}
      onChangeText={setInputValue}
      //   regex="^[\w.\-@]*$"
      placeholder={placeholder || 'Enter upi id'}
      disabled={isDisabled}
      required={required}
    />
  );
};

export {UpiIdField};
