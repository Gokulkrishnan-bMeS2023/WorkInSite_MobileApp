import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useUpiCreateForm} from './useUpiCreateForm';
import Select from '../../../components/CommonComponets/Select/Select';
import Button from '../../../components/CommonComponets/Button/Button';
import { WorkerDetailsType } from '../DTOs/WorkerDetails';
import { UpiTypes } from '../../Suppliers/DTOs/SupplierProps';
import { UpiInputFields } from '../../Suppliers/UpiInputFields/UpiInputFields';
const UpiCreateForm = (props: WorkerDetailsType) => {
  const {
    upiType,
    upiItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  } = useUpiCreateForm(props);

  return (
    <View style={styles.container}>
      <View>
        <Select
          selectedValue={upiType}
          items={upiItems}
          errorMessage={error.select}
          onValueChange={handleSelectChange}
        />
        <UpiInputFields
          upiType={upiType as UpiTypes}
          input={input}
          setInput={setInput}
          error={error}
        />
      </View>
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

export {UpiCreateForm};
