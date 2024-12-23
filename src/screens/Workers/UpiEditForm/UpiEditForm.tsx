import {useUpiEditForm} from './useUpiEditForm';
import {UpiEditFormProps} from './DTOs';
import {View} from 'react-native';
import Button from '../../../components/CommonComponets/Button/Button';
import Select from '../../../components/CommonComponets/Select/Select';
import {UpiInputFields} from '../../Suppliers/UpiInputFields/UpiInputFields';

const UpiEditForm = (props: UpiEditFormProps) => {
  const {upiType, upiItems, input, setInput, error, handleUpdate} =
    useUpiEditForm(props);
  const handleChange = () => {};
  return (
    <View>
      <Select
        items={upiItems}
        selectedValue={props.selectedItem.type}
        onValueChange={handleChange}
        isDisabled={true}
      />
      <UpiInputFields
        upiType={upiType}
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

export {UpiEditForm};
