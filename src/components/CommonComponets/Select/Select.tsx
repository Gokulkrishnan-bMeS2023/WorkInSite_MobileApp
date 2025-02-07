import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add icon library
import {Colors, SH} from '../../../utils';

interface SelectItem {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  items: SelectItem[];
  selectedValue?: string | number;
  onValueChange: (value: string | number | any) => void;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorMessage?: string; // New prop for error message
}

const Select: React.FC<SelectProps> = ({
  label,
  items,
  selectedValue,
  onValueChange,
  placeholder,
  isDisabled = false,
  required = false,
  errorMessage, // Destructure the new prop
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.asterisk}>*</Text>}
        </View>
      )}
      <TouchableOpacity
        style={[styles.selectTrigger, isDisabled && styles.disabledTrigger]}
        onPress={toggleDropdown}
        disabled={isDisabled}>
        <Text style={styles.selectValue}>
          {selectedValue
            ? items.find(item => item.value === selectedValue)?.label
            : placeholder || 'Select'}
        </Text>
        <Icon
          name={isDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={24}
          color={Colors.black}
          style={styles.icon}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={styles.dropdownWrapper}>
          <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.selectItem,
                  item.value === selectedValue && styles.selectedItem,
                ]}
                onPress={() => handleSelect(item.value)}>
                <Text style={styles.selectItemText}>{item.label}</Text>
                {item.value === selectedValue && (
                  <Icon
                    name="check"
                    size={25}
                    color={Colors.primaryColor}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </Animatable.View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    position: 'relative',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
  },
  asterisk: {
    fontSize: 16,
    color: Colors.dangerColor,
    marginLeft: 4,
  },
  selectTrigger: {
    padding: 14,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.grayColor,
     borderRadius: SH(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledTrigger: {
    backgroundColor: '#F5F5F5',
    opacity: 0.5,
  },
  selectValue: {
    fontSize: 16,
    color: Colors.black,
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    borderRadius: SH(7),
    backgroundColor: '#fff',
    zIndex: 1,
  },
  selectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  selectedItem: {
    backgroundColor: Colors.selecthoverbgcolor,
  },
  selectItemText: {
    fontSize: 16,
    color: Colors.black,
  },
  checkIcon: {
    marginLeft: 8,
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.dangerColor,
  },
});
