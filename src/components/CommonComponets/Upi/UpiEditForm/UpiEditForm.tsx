import React from 'react';
import {View} from 'react-native';
import {useUpiEditForm} from './useUpiEditForm';
import {UpiDetails, UpiEditFormProps} from './DTOs';
import Select from '../../Select/Select';
import {UpiInputFields} from '../UpiInputFields/UpiInputFields';
import Button from '../../Button/Button';

const UpiEditForm = <T extends {upiDetails: UpiDetails[]}>(
  props: UpiEditFormProps<T>,
) => {
  const {upiType, upiItems, input, setInput, error, handleUpdate} =
    useUpiEditForm(props);

  return (
    <View>
      <Select
        items={upiItems}
        selectedValue={props.selectedItem.type}
        onValueChange={() => {}}
        isDisabled={true}
      />
      <UpiInputFields
        upiType={upiType}
        input={input}
        setInput={setInput}
        error={error}
      />
      <Button
        title="Update"
        onPress={handleUpdate}
        buttonStyle={{marginTop: 16}}
      />
    </View>
  );
};

export {UpiEditForm};
