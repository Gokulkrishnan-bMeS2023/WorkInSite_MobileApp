import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../../components/CommonComponets/Button/Button';
import Select from '../../../components/CommonComponets/Select/Select';
import {KycEditFormProps} from './DTOs';
import {useKycEditForm} from './useKycEditForm';
import { KycInputFields } from '../../Suppliers/KycInputFields/KycInputFields';

const KycEditForm = (props: KycEditFormProps) => {
  const {kycType, kycItems, input, setInput, error, handleUpdate} =
    useKycEditForm(props);

  const handleChange = () => {};

  return (
    <View style={styles.container}>
      <View>
        <Select
          items={kycItems}
          selectedValue={props.selectedItem.type}
          onValueChange={handleChange}
          isDisabled={true}
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

