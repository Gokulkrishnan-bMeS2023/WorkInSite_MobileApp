import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch as ReactNativeSwitch} from 'react-native-switch';
import {Colors} from '../../../utils';

interface CustomSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const Switch: React.FC<CustomSwitchProps> = ({
  label,
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReactNativeSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        activeText={''} // No text displayed
        inActiveText={''} // No text displayed
        circleSize={24}
        barHeight={25}
        backgroundActive={disabled ? Colors.grayColor : Colors.primaryColor}
        backgroundInactive={Colors.grayColor}
        circleActiveColor={Colors.white}
        circleInActiveColor={Colors.white}
        switchLeftPx={3}
        switchRightPx={3}
        switchBorderRadius={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default Switch;
