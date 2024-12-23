import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useContactCreateForm} from './useContactCreateForm';
import Select from '../../../components/CommonComponets/Select/Select';
import {ContactListType} from '../DTOs/ContactList';
import {ContactInputFields} from '../ContactInputFields/ContactInputFields';
import {ContactTypes} from '../DTOs/ContactProps';
import Button from '../../../components/CommonComponets/Button/Button';
import {Colors} from '../../../utils';

const ContactCreateForm = (props: ContactListType) => {
  const {
    contactType,
    contactItems,
    input,
    setInput,
    error,
    handleSelectChange,
    handleAdd,
  } = useContactCreateForm(props);

  return (
    <View style={styles.container}>
      <Select
        selectedValue={contactType}
        items={contactItems}
        onValueChange={handleSelectChange}
        errorMessage={error.select}
      />
      <ContactInputFields
        contactType={contactType as ContactTypes}
        input={input}
        setInput={setInput}
        error={error}
      />
      <Button buttonStyle={{marginTop: 16}} title="Save" onPress={handleAdd} />
    </View>
  );
};

export default ContactCreateForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
});
