import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../utils';
interface RadioButtonGroupProps {
  label: string;
  items: Array<{label: string; value: string}>;
  selectedValue: string;
  onValueChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
}
const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  items,
  selectedValue,
  onValueChange,
  errorMessage,
  required = false,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.errorStyle}> *</Text>}
        </Text>
      )}
      <View style={styles.radioGroup}>
        {items.map(item => (
          <TouchableOpacity
            key={item.value}
            style={styles.radioItem}
            onPress={() => onValueChange(item.value)}>
            <View style={styles.radioCircle}>
              {selectedValue === item.value && (
                <View style={styles.selectedCircle} />
              )}
            </View>
            <Text style={styles.radioLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errorMessage ? (
        <Text style={styles.errorStyle}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: Colors.black,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryColor,
  },
  radioLabel: {
    fontSize: 16,
  },
  errorStyle: {
    color: Colors.dangerColor,
    fontSize: 16,
    marginTop: 2,
  },
});
export default RadioButtonGroup;
