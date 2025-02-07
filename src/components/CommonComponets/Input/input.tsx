import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SF, SH, SW } from '../../../utils';
import { Colors, Fonts } from '../../../utils'; // Assuming you have Colors and Fonts defined elsewhere
interface InputsProps {
  title?: string;
  placeholder?: string;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle;
  onChangeText?: (text: string) => void;
  value?: string;
  inputType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  onEndEditing?: (e: any) => void;
  inputContainerStyle?: ViewStyle;
  numberOfLines?: number;
  regex?: RegExp;

}
const Input: React.FC<InputsProps> = ({
  title = '',
  placeholder = '',
  titleStyle = {},
  inputStyle = {},
  onChangeText = () => { },
  value = '',
  inputType = 'default',
  autoFocus = false,
  secureTextEntry = false,
  maxLength,
  errorMessage = '',
  regex,
  disabled = false,
  required = false,
  containerStyle,
  onEndEditing = () => { },
  inputContainerStyle,
  numberOfLines,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          ...containerStyle,
        },
        inputContainerStyle: {
          height: 50,
          ...inputContainerStyle,
        },
        inputStyle: {
          flex: 1,
          fontSize: SF(16),
          borderRadius: SH(7),
          paddingHorizontal: SW(10),
          height: SH(50),
          color: Colors.grayColor,
          borderColor: isFocused ? Colors.primaryColor : Colors.grayColor,
          borderWidth: 1,
          ...inputStyle,
        },
        labelStyle: {
          fontSize: SF(15),
          color: Colors.black,
          fontWeight: '500',
          paddingBottom: SH(8),
          ...titleStyle,
        },
        requiredAsterisk: {
          color: Colors.dangerColor,
        },
        errorStyle: {
          marginTop: 2,
          color: Colors.dangerColor,
          fontSize: 16,
        },
      }),
    [title, titleStyle, inputStyle, Colors, isFocused],
  );
  return (
    <View style={styles.container}>
      {title ? (
        <Text style={styles.labelStyle}>
          {title}
          {required && <Text style={styles.requiredAsterisk}> *</Text>}
        </Text>
      ) : null}
      <View style={styles.inputContainerStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor={Colors.grayColor}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={text => {
            if (!regex || regex.test(text)) {
              onChangeText(text);
            }
          }}
          keyboardType={inputType}
          secureTextEntry={secureTextEntry}
          value={value}
          autoFocus={autoFocus}
          maxLength={maxLength}
          editable={!disabled}
          onEndEditing={onEndEditing}
          numberOfLines={numberOfLines}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorStyle}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
export default Input;

