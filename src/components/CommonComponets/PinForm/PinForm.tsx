import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PinInput from '../Pin/Pin';
import {Colors} from '../../../utils';
import {PinFormProps} from './DTOs';
import Button from '../Button/Button';

const PinForm = ({
  pin,
  setPin,
  confirmPin,
  setConfirmPin,
  error,
  onSave,
}: PinFormProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>New Pin:</Text>
      <PinInput value={pin} onPinChange={setPin} secureTextEntry={true} />
      {error.pin && <Text style={styles.errorText}>{error.pin}</Text>}

      <Text style={styles.labelText}>Confirm Pin:</Text>
      <PinInput
        value={confirmPin}
        onPinChange={setConfirmPin}
        secureTextEntry={true}
      />
      {error.confirmPin && (
        <Text style={styles.errorText}>{error.confirmPin}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={onSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {gap: 10},
  labelText: {color: Colors.black, fontSize: 16},
  errorText: {color: Colors.dangerColor, fontSize: 16},
  buttonContainer: {marginTop: 10},
});

export default PinForm;
