import React from 'react';
import {View, StyleSheet} from 'react-native';
import {UpiInputFields} from '../UpiInputFields/UpiInputFields';
import {useUpiCreateForm} from './useUpiCreateForm';
import {UpiTypes} from '../DTOs/SupplierProps';
import Select from '../../../components/CommonComponets/Select/Select';
import {SupplierDetailsType} from '../DTOs/SupplierDetails';
import Button from '../../../components/CommonComponets/Button/Button';
const UpiCreateForm = (props: SupplierDetailsType) => {
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
