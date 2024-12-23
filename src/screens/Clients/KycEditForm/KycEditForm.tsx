import React from 'react';
import {View} from 'react-native';
import {KycInputFields} from '../KycInputFields/KycInputFields';
import {useKycEditForm} from './useKycEditForm';
import {ClientEditFormProps} from './DTOs';
import Select from '../../../components/CommonComponets/Select/Select';
import Button from '../../../components/CommonComponets/Button/Button';

const KycEditForm = (props: ClientEditFormProps) => {
  const {kycType, kycItems, input, setInput, error, handleUpdate} =
    useKycEditForm(props);

  return (
    <View>
      <Select
        items={kycItems}
        selectedValue={props.selectedItem.type}
        onValueChange={() => {}}
        isDisabled={true}
      />
      <KycInputFields
        kycType={kycType}
        input={input}
        setInput={setInput}
        error={error}
      />
      <Button
        buttonStyle={{marginTop: 16}}
        title="Update"
        onPress={handleUpdate}
      />
    </View>
  );
};

export {KycEditForm};
