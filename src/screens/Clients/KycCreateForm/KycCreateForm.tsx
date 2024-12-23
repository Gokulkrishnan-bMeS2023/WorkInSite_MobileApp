import React from 'react';
import {View} from 'react-native';
import {useKycCreateForm} from './useKycCreateForm';
import {KycInputFields} from '../KycInputFields/KycInputFields';
import Select from '../../../components/CommonComponets/Select/Select';
import {ClientDetailsType} from '../DTOs/ClientDetails';
import {KYCTypes} from '../DTOs/ClientProps';
import Button from '../../../components/CommonComponets/Button/Button';

const KycCreateForm: React.FC<ClientDetailsType> = (
  props: ClientDetailsType,
) => {
  const {
    kycType,
    kycItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  } = useKycCreateForm(props);

  return (
    <View>
      <Select
        items={kycItems}
        selectedValue={kycType}
        onValueChange={handleSelectChange}
        required={false}
        errorMessage={error.select}
      />
      <KycInputFields
        kycType={kycType as KYCTypes}
        input={input}
        setInput={setInput}
        error={error}
      />
      <Button buttonStyle={{marginTop: 16}} title="Add" onPress={handleAdd} />
    </View>
  );
};

export {KycCreateForm};
