import {KycInputFieldProps} from './DTOs';
import {AadhaarNumberField} from './AadhaarNumberField';
import {GstNumberField} from './GstNumberField';
import {PanNumberField} from './PanNumberField ';
// import { KYCTypes } from '../../clients/DTOs/ClientProps';

enum KYCTypes {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  GST = 'GST',
}

const KycInputFields = (props: KycInputFieldProps) => {
  const {kycType, input, setInput, error} = props;

  const kycComponents = {
    [KYCTypes.AADHAAR]: AadhaarNumberField,
    [KYCTypes.PAN]: PanNumberField,
    [KYCTypes.GST]: GstNumberField,
  };

  const KycComponent = kycComponents[kycType];

  return (
    KycComponent && (
      <KycComponent
        inputValue={input}
        handleInputChange={setInput}
        errorMessage={error[kycType.toLowerCase()]}
        // label={`Enter ${kycType} Number`}
        // isDisabled={false}
      />
    )
  );
};

export {KycInputFields};
