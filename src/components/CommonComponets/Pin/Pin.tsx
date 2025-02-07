import React, {useRef, FC, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Text, // Import Text for label and error message
} from 'react-native';
import {SF, SH, SW} from '../../../utils';
import {Colors} from '../../../utils';
import {numberRegex} from '../../../utils/regex';
interface PinInputProps {
  value: string;
  pinLength?: number;
  secureTextEntry?: boolean;
  onPinChange: (pin: string) => void;
  errorMessage?: string; // New prop for error message
  label?: string; // New prop for the label text
  isRequired?: boolean; // New prop for marking the field as required
}
const PinInput: FC<PinInputProps> = ({
  value,
  pinLength = 4,
  secureTextEntry = false,
  onPinChange,
  errorMessage,
  label,
  isRequired = false, // Default to false if not provided
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // Track focused index
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(pinLength).fill(null),
  );

  const handleTextChange = (text: string, index: number) => {
    if (numberRegex.test(text)) {
      const newPin = value.split('');
      newPin[index] = text;
      onPinChange(newPin.join(''));
      if (text && index < pinLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleBackspace = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1]?.focus();
      handleTextChange('', index - 1);
    }
  };
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };
  const handleBlur = () => {
    setFocusedIndex(null);
  };
  return (
    <View style={styles.container}>
      {/* Display label if available */}
      {label && (
        <Text style={styles.label}>
          {label} {isRequired ? <Text style={styles.required}>*</Text> : null}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {Array.from({length: pinLength}).map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.pinInput,
              focusedIndex === index && styles.pinInputFocused,
            ]}
            maxLength={1}
            value={value[index] || ''}
            onChangeText={text => handleTextChange(text, index)}
            secureTextEntry={secureTextEntry}
            placeholder="*"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onKeyPress={event => handleBackspace(index, event)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
          />
        ))}
      </View>
      {/* Display error message if provided */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Change to column to stack label, inputs, and error message
  },
  label: {
    fontWeight: '500',
    fontSize: SF(16),
    color: Colors.black,
    marginBottom: SH(8), // Some space between label and inputs
  },
  required: {
    color: Colors.dangerColor, // Color for the asterisk
  },
  inputContainer: {
    flexDirection: 'row', // Keep inputs in a row
    justifyContent: 'space-between',
  },
  pinInput: {
    width: SW(60),
    height: SH(50),
    fontSize: SF(16),
    textAlign: 'center',
    textAlignVertical: 'center', // Ensures cursor stays centered vertically
    paddingTop: SH(12), // Adjust to center the text vertically in the input
    paddingBottom: SH(12), // Adjust to balance the padding
    borderWidth: 1,
    borderColor: Colors.grayColor,
    color: Colors.black,
    borderRadius: SH(10),
  },
  pinInputFocused: {
    borderColor: Colors.primaryColor,
  },
  errorMessage: {
    color: Colors.dangerColor, // Use a color for errors
    fontSize: 16,
    marginTop: SH(4), // Some space between the input and the error message
  },
});
export default PinInput;
