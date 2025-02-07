import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KycInputFields} from '../KycInputFields/KycInputFields';
import {useKycEditForm} from './useKycEditForm';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import { KycEditFormProps } from './DTOs';

const KycEditForm = (props: KycEditFormProps) => {
  const {details, setDetails, selectedItem, Ref} = props; // dynamic details and setDetails

  // Use the dynamic hook with passed props
  const {kycType, kycItems, input, setInput, error, handleUpdate} =
    useKycEditForm({
      details,
      setDetails,
      selectedItem,
      Ref,
    });

  const handleChange = (value: string) => {
    setInput(value); // Update the input when select value changes
  };

  return (
    <View style={styles.container}>
      <View>
        <Select
          items={kycItems}
          selectedValue={selectedItem.type}
          onValueChange={handleChange}
          isDisabled={true} // You can enable this based on your requirements
        />
        <KycInputFields
          kycType={kycType}
          input={input}
          setInput={setInput}
          error={error}
        />
      </View>
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

export {KycEditForm};
