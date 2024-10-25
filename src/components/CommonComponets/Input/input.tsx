// import React, {useMemo} from 'react';
// import {View, StyleSheet, TextStyle, ViewStyle, Text} from 'react-native';
// import {Input, InputProps} from 'react-native-elements';
// import {SF, SH, SW} from '../../../utils';
// import {Colors, Fonts} from '../../../utils'; // Assuming you have Colors and Fonts defined elsewhere

// // Define the prop types for the component
// interface InputsProps {
//   title?: string;
//   placeholder?: string;
//   titleStyle?: TextStyle;
//   inputStyle?: TextStyle;
//   onChangeText?: (text: string) => void;
//   value?: string;
//   inputprops?: InputProps;
//   onBlur?: () => void;
//   onFocus?: () => void;
//   inputType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
//   autoFocus?: boolean;
//   secureTextEntry?: boolean;
//   maxLength?: number;
//   leftIcon?: any;
//   rightIcon?: any;
//   errorMessage?: string;
//   disabled?: boolean;
//   required?: boolean;
//   containerStyle?: ViewStyle;
//   onEndEditing?: (e: any) => void;
//   inputContainerStyle?: ViewStyle;
//   numberOfLines?: number;
// }

// const Inputs: React.FC<InputsProps> = ({
//   title = '',
//   placeholder = '',
//   titleStyle = {},
//   inputStyle = {},
//   onChangeText = () => {},
//   value = '',
//   inputprops = {},
//   onBlur = () => {},
//   onFocus = () => {},
//   inputType = 'default',
//   autoFocus = false,
//   secureTextEntry = false,
//   maxLength,
//   leftIcon = {},
//   rightIcon = {},
//   errorMessage = '',
//   disabled = false,
//   required = false,
//   containerStyle,
//   onEndEditing = () => {},
//   inputContainerStyle,
//   numberOfLines,
// }) => {
//   const styles = useMemo(
//     () =>
//       StyleSheet.create({
//         container: {
//           width: '100%',
//           ...containerStyle,
//           marginBottom: 0,
//         },
//         inputContainerStyle: {
//           borderBottomWidth: SH(0),
//           width: '100%',
//           ...inputContainerStyle,
//         },
//         containerStyle: {
//           paddingHorizontal: 0,
//         },
//         input_style: {
//           width: '100%',
//           fontSize: SF(16),
//           // fontWeight: '600',
//           height: SH(58),
//           marginBottom: SH(0),
//           color: Colors.black_text_color,
//           paddingVertical: SH(8),
//           paddingHorizontal: SH(10),
//           borderRadius: SH(7),
//           // fontFamily: Fonts.Poppins_Regular,
//           // backgroundColor: 'hsl(0, 0%, 94.9%)',
//           backgroundColor:"#FFFFFF",
//           borderColor:"lightgray",
//           borderWidth:1,
//           ...inputStyle,
//         },
//         labelStyle: {
//           width: '100%',
//           fontSize: SF(18),
//           color: Colors.black_text_color,
//           // paddingHorizontal: SW(5),
//           ...titleStyle,
//           // fontWeight: '500',
//           paddingVertical: SH(4),
//           // fontFamily: Fonts.Poppins_SemiBold,
//         },
//         requiredAsterisk: {
//           color: Colors.red_text_color, // Make the asterisk red
//         },
//         errorStyle: {
//           color: Colors.red_text_color,
//           // fontFamily: Fonts.Poppins_Regular,
//         },
//       }),
//     [title, titleStyle, inputStyle, Colors],
//   );

//   return (
//     <View style={styles.container}>
//       <Input
//         label={
//           <Text style={styles.labelStyle}>
//             {title}
//             {required && <Text style={styles.requiredAsterisk}> *</Text>}
//           </Text>
//         }
//         placeholder={placeholder}
//         onChangeText={text => onChangeText(text)}
//         // leftIcon={leftIcon}
//         placeholderTextColor={Colors.gray_text_color}
//         // rightIcon={rightIcon}
//         numberOfLines={numberOfLines}
//         errorMessage={errorMessage}
//         disabled={disabled}
//         onFocus={onFocus}
//         onBlur={onBlur}
//         autoFocus={autoFocus}
//         keyboardType={inputType}
//         secureTextEntry={secureTextEntry}
//         value={value}
//         selectionColor={Colors.theme_backgound}
//         maxLength={maxLength}
//         {...inputprops}
//         errorStyle={styles.errorStyle}
//         inputStyle={styles.input_style}
//         inputContainerStyle={styles.inputContainerStyle}
//         containerStyle={styles.containerStyle}
//         onEndEditing={onEndEditing}
//       />
//     </View>
//   );
// };

// export default Inputs;

// //2
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TextStyle, ViewStyle, Text} from 'react-native';
import {Input, InputProps} from 'react-native-elements';
import {SF, SH, SW} from '../../../utils';
import {Colors, Fonts} from '../../../utils'; // Assuming you have Colors and Fonts defined elsewhere
// Define the prop types for the component
interface InputsProps {
  title?: string;
  placeholder?: string;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle;
  onChangeText?: (text: string) => void;
  value?: string;
  inputprops?: InputProps;
  onBlur?: () => void;
  onFocus?: () => void;
  inputType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  leftIcon?: any;
  rightIcon?: any;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  onEndEditing?: (e: any) => void;
  inputContainerStyle?: ViewStyle;
  numberOfLines?: number;
}
const Inputs: React.FC<InputsProps> = ({
  title = '',
  placeholder = '',
  titleStyle = {},
  inputStyle = {},
  onChangeText = () => {},
  value = '',
  inputprops = {},
  onBlur = () => {},
  onFocus = () => {},
  inputType = 'default',
  autoFocus = false,
  secureTextEntry = false,
  maxLength,
  leftIcon = {},
  rightIcon = {},
  errorMessage = '',
  disabled = false,
  required = false,
  containerStyle,
  onEndEditing = () => {},
  inputContainerStyle,
  numberOfLines,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          ...containerStyle,
          marginBottom: 0,
        },
        inputContainerStyle: {
          borderBottomWidth: SH(0),
          width: '100%',
          ...inputContainerStyle,
        },
        containerStyle: {
          paddingHorizontal: 0,
        },
        input_style: {
          width: '100%',
          fontSize: SF(16),
          height: SH(50),
          marginBottom: SH(0),
          color: Colors.black_text_color,
          paddingVertical: SH(8),
          paddingHorizontal: SH(10),
          borderRadius: SH(7),
          backgroundColor: '#FFFFFF',
          borderColor: isFocused ? Colors.primaryColor : 'lightgray',
          borderWidth: 1,
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(18),
          color: Colors.black_text_color,
          // paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(8),
          // fontFamily: Fonts.Poppins_SemiBold,
        },
        requiredAsterisk: {
          color: Colors.red_text_color, // Make the asterisk red
        },
        errorStyle: {
          color: Colors.dangerColor,
          fontSize: 14,
          // fontFamily: Fonts.Poppins_Regular,
        },
      }),
    [title, titleStyle, inputStyle, Colors, isFocused],
  );
  return (
    <View style={styles.container}>
      <Input
        label={
          <Text style={styles.labelStyle}>
            {title}
            {required && <Text style={styles.requiredAsterisk}> *</Text>}
          </Text>
        }
        placeholder={placeholder}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        onChangeText={text => onChangeText(text)}
        // leftIcon={leftIcon}
        placeholderTextColor={Colors.gray_text_color}
        // rightIcon={rightIcon}
        numberOfLines={numberOfLines}
        errorMessage={errorMessage}
        disabled={disabled}
        autoFocus={autoFocus}
        keyboardType={inputType}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={Colors.theme_backgound}
        maxLength={maxLength}
        {...inputprops}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        onEndEditing={onEndEditing}
      />
    </View>
  );
};
export default Inputs;
