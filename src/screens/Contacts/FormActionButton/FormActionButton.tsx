import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../../utils';
import Icon from '../../../utils/VectorIcons';

interface FormActionButtonProps {
  heading: string;
  iconType: 'edit' | 'plus-circle';
  onClick: () => void;
  isIconDisabled?: boolean;
  required?: boolean;
}
const FormActionButton: React.FC<FormActionButtonProps> = ({
  heading,
  iconType,
  onClick,
  isIconDisabled = false,
  required = false,
}) => {
  const renderIcon = () => {
    if (iconType === 'edit') {
      return (
        <Icon 
          icon="MaterialCommunityIcons"
          name={'playlist-edit'}
          size={36}
          color={isIconDisabled ? Colors.grayColor : Colors.secondaryColor}
        />
      );
    } else if (iconType === 'plus-circle') {
      return (
        <Icon 
          icon="MaterialCommunityIcons"
          name={iconType}
          size={36}
          color={isIconDisabled ? Colors.grayColor : Colors.secondaryColor}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{heading}</Text>
        {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={onClick}
          disabled={isIconDisabled}
          style={[styles.iconContainer, isIconDisabled && styles.disabledIcon]}>
          {renderIcon()}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  requiredAsterisk: {
    color: Colors.dangerColor,
    marginLeft: 2,
  },
  iconContainer: {
    borderRadius: 8,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});
export {FormActionButton};
