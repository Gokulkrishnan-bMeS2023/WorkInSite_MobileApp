import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Colors from '../../../utils/color';
import {SF} from '../../../utils/dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Feather icons
interface TextareaProps {
  label?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  showLocationLink?: boolean; // Prop to show location link
}
const Textarea: React.FC<TextareaProps> = props => {
  const {
    label,
    length = 1000,
    value,
    onChange,
    placeholder,
    isDisabled,
    required = false,
    errorMessage,
    showLocationLink = false, // Default to false
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  // Function to open Google Maps
  const handleGetLocation = () => {
    const googleMapsUrl = 'https://www.google.com/maps'; // Google Maps link
    Linking.openURL(googleMapsUrl).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.requiredAsterisk}> *</Text>}
          </Text>
        )}
        {showLocationLink && (
          <TouchableOpacity
            style={styles.locationLinkContainer}
            onPress={handleGetLocation}>
            <Icon
              name="map-marker"
              size={24}
              color={Colors.secondaryColor}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>Get Location</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textareaContainer}>
        <TextInput
          style={[
            styles.textarea,
            isDisabled && styles.disabledTextarea,
            {borderColor: isFocused ? Colors.primaryColor : Colors.grayColor},
            errorMessage && styles.errorBorder,
          ]}
          maxLength={length}
          value={value}
          onChangeText={text => onChange?.(text.trimStart())}
          placeholder={placeholder}
          placeholderTextColor={Colors.grayColor}
          editable={!isDisabled}
          multiline
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Text style={[styles.textCount, isDisabled && styles.disabledText]}>
          {value?.length}/{length}
        </Text>
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: SF(16),
    fontWeight: '500',
    color: Colors.black,
  },
  requiredAsterisk: {
    color: Colors.dangerColor,
    fontSize: 20,
  },
  locationLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: Colors.grayColor,
    fontWeight:'500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  textareaContainer: {
    position: 'relative',
  },
  textarea: {
    height: 100,
    padding: 10,
    color:Colors.grayColor,
    fontSize: SF(16),
    borderWidth: 1,
    borderRadius: 6,
    textAlignVertical: 'top',
  },
  disabledTextarea: {
    backgroundColor: '#F0F0F0',
  },
  textCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 12,
    color: '#888',
  },
  disabledText: {
    color: '#bbb',
  },
  errorMessage: {
    color: Colors.dangerColor,
    fontSize: 16,
    marginTop: 4,
  },
  errorBorder: {
    borderColor: Colors.dangerColor,
  },
});
export default Textarea;
