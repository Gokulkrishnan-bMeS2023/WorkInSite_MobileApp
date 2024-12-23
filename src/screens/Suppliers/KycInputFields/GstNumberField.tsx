import { Input } from "../../../components/CommonComponets";

interface InputPropTypes {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  inputValue: string;
  handleInputChange: (value: string) => void;
  required?: boolean;
}

const GstNumberField = (props: InputPropTypes) => {
  const {
    label,
    errorMessage,
    placeholder,
    isDisabled,
    required = false,
    inputValue,
    handleInputChange,
  } = props;
  return (
    <Input
      errorMessage={errorMessage}
      title={label}
      value={inputValue}
      onChangeText={handleInputChange}
      //   regex="^[A-Z\d]*$"
      maxLength={15}
      placeholder={placeholder || 'Enter GST number'}
      disabled={isDisabled}
      required={required}
    />
  );
};

export {GstNumberField};
