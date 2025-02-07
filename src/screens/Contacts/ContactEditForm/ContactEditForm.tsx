import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useContactEditForm} from './useContactEditForm';
import {ContactEditFormProps} from './DTOs';
import Select from '../../../components/CommonComponets/Select/Select';
import Button from '../../../components/CommonComponets/Button/Button';
import {ContactInputFields} from '../ContactInputFields/ContactInputFields';
import commonStyle from '../../../styles/commonStyle';
const ContactEditForm = (props: ContactEditFormProps) => {
  const {contactType, contactItems, input, setInput, error, handleUpdate} =
    useContactEditForm(props);
  const handleOnChange = () => {};
  return (
    <View style={commonStyle.spacer}>
      <View>
        <Select
          items={contactItems}
          selectedValue={props.selectedItem.type}
          onValueChange={handleOnChange}
          isDisabled={true}
        />
        <ContactInputFields
          contactType={contactType}
          input={input}
          setInput={setInput}
          error={error}
        />
      </View>
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};
export {ContactEditForm};
