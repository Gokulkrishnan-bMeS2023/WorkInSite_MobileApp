import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {SF, SH, SW} from '../../../utils'; // Scaling utilities
import {Colors, Fonts} from '../../../utils'; // Colors and Fonts modules

interface PinInputProps {
  pinLength?: number;
  secureTextEntry?: boolean;
  onPinChange?: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({
  pinLength = 4, // Default pin length is 4 if not provided
  secureTextEntry = false,
  onPinChange,
}) => {
  const [pin, setPin] = useState<string[]>(Array(pinLength).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // Track focused index
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(pinLength).fill(null),
  );

  // Handle text change
  const handleTextChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // Notify parent component
    if (onPinChange) {
      onPinChange(newPin.join(''));
    }

    // Automatically focus the next input if not the last one
    if (text && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleBackspace = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !pin[index]) {
      inputRefs.current[index - 1]?.focus(); // Focus previous input
      handleTextChange('', index - 1); // Clear previous input
    }
  };

  // Handle key press
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && pin[index] === '') {
      handleBackspace(index, event);
    }
  };

  // Handle focus
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  // Handle blur (unfocus)
  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
      {Array(pinLength)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.pinInput,
              focusedIndex === index && styles.pinInputFocused, // Apply focus styles
            ]}
            maxLength={1}
            value={pin[index]}
            onChangeText={text => handleTextChange(text, index)}
            secureTextEntry={secureTextEntry}
            placeholder="*"
            // autoFocus={index === 0} // Autofocus the first input
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onKeyPress={event => handleKeyPress(event, index)}
            onFocus={() => handleFocus(index)} // Set focus index
            onBlur={handleBlur} // Reset focus index on blur
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20),
    gap: SW(5),
  },
  pinInput: {
    width: SW(70),
    height: SH(50),
    fontSize: SF(20),
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.black_text_color,
    fontFamily: Fonts.Inter,
    backgroundColor: Colors.inputBackgroundColor,
    // marginHorizontal: SW(5),
    borderRadius: SH(50),
  },
  pinInputFocused: {
    borderColor: Colors.focusBorderColor, // Change border color on focus
    backgroundColor: Colors.focusBackgroundColor, // Optional: change background color
  },
});

export default PinInput;
