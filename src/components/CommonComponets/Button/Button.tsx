import React, {useMemo} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import Fonts from '../../../utils/fonts';
import Colors from '../../../utils/color';
import {SF, SH, SW} from '../../../utils/dimensions';
interface ButtonProps {
  title: string;
  onPress: any;
  buttonStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  buttonTextStyle?: StyleProp<TextStyle>;
}
const Button: React.FC<ButtonProps> = ({
  title = '',
  onPress,
  buttonStyle = {},
  disable = false,
  buttonTextStyle = {},
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonStyle: {
          alignItems: 'center',
          borderRadius: 6,
          justifyContent: 'center',
          backgroundColor: Colors.primaryColor,
          width: '100%',
          textAlign: 'center',
          height: 50,
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: Platform.OS === 'ios' ? 0 : 0,
          },
          shadowOpacity: 0.58,
          shadowRadius: Platform.OS === 'ios' ? 0 : 0,
          elevation: Platform.OS === 'ios' ? 0 : 0,
        },
        buttonTextStyle: {
          // color: Colors.secondaryBgTextColor,
          color: 'black',
          // fontFamily: Fonts.Poppins_SemiBold,
          fontSize: SF(19),
          fontWeight: '600',
          lineHeight: SH(26),
        },
        buttonViewStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        },
      }),
    [disable, Colors],
  );
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.buttonStyle, buttonStyle]}
      onPress={() => onPress()}>
      <View style={styles.buttonViewStyle}>
        <Text style={[styles.buttonTextStyle, buttonTextStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
