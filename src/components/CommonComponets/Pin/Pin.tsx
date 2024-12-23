import React, {useRef, FC, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {SF, SH, SW} from '../../../utils';
import {Colors, Fonts} from '../../../utils';

interface PinInputProps {
  value: string;
  pinLength?: number;
  secureTextEntry?: boolean;
  onPinChange: (pin: string) => void;
}

const PinInput: FC<PinInputProps> = ({
  value,
  pinLength = 4,
  secureTextEntry = false,
  onPinChange,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // Track focused index

  const inputRefs = useRef<Array<TextInput | null>>(
    Array(pinLength).fill(null),
  );

  const handleTextChange = (text: string, index: number) => {
    const newPin = value.split('');
    newPin[index] = text;
    onPinChange(newPin.join(''));

    if (text && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    fontFamily: Fonts.Inter,
    borderRadius: SH(10),
  },
  pinInputFocused: {
    borderColor: Colors.primaryColor,
  },
});

export default PinInput;
