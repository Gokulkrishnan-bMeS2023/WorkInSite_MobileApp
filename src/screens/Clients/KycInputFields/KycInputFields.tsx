import React, {useCallback} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KycInputFieldProps} from './DTOs';
import {KYCTypes} from '../DTOs/ClientProps';
import {Input} from '../../../components/CommonComponets';

const KycInputFields: React.FC<KycInputFieldProps> = ({
  kycType,
  input,
  setInput,
  error,
}) => {
  const kycComponents: Record<KYCTypes, React.FC<any>> = {
    [KYCTypes.AADHAAR]: props => (
      <Input
        value={props.inputValue}
        onChangeText={(value: string) => props.setInputValue(value)}
        errorMessage={props.errorMessage}
        placeholder="Enter Aadhaar number"
        maxLength={12}
        inputType="numeric"
        regex={/^\d*$/}
        required
      />
    ),
    [KYCTypes.PAN]: props => (
      <Input
        value={props.inputValue}
        onChangeText={(value: string) => props.setInputValue(value)}
        errorMessage={props.errorMessage}
        placeholder="Enter PAN number"
        maxLength={10}
        required
      />
    ),
    [KYCTypes.GST]: props => (
      <Input
        value={props.inputValue}
        onChangeText={(value: string) => props.setInputValue(value)}
        errorMessage={props.errorMessage}
        placeholder="Enter GST number"
        maxLength={15}
        required
      />
    ),
  };

  const KycComponent = kycComponents[kycType];

  const KycMemoizedComponent = useCallback(KycComponent, [kycType]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {KycMemoizedComponent && (
            <KycMemoizedComponent
              inputValue={input}
              setInputValue={(value: string) => setInput(value)}
              errorMessage={error[kycType.toLowerCase()]}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export {KycInputFields};