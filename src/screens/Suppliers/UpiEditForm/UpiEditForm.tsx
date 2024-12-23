import {UpiInputFields} from '../UpiInputFields/UpiInputFields';
import {useUpiEditForm} from './useUpiEditForm';
import {UpiEditFormProps} from './DTOs';
import {View} from 'react-native';
import Button from '../../../components/CommonComponets/Button/Button';
import Select from '../../../components/CommonComponets/Select/Select';

const UpiEditForm = (props: UpiEditFormProps) => {
  const {upiType, upiItems, input, setInput, error, handleUpdate} =
    useUpiEditForm(props);
  const handleChange = () => {};
  return (
    <View style={{gap: 16}}>
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
      </View>
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

export {UpiEditForm};
