import {useKycCreateForm} from './useKycCreateForm';
import Select from '../../../components/CommonComponets/Select/Select';
import Button from '../../../components/CommonComponets/Button/Button';
import {View} from 'react-native';
import {KYCTypes} from '../../clients/DTOs/ClientProps';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';
import {KycInputFields} from '../../Suppliers/KycInputFields/KycInputFields';

const KycCreateForm = (props: WorkerDetailsType) => {
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
        selectedValue={kycType}
        items={kycItems}
        errorMessage={error.select}
        onValueChange={handleSelectChange}
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
