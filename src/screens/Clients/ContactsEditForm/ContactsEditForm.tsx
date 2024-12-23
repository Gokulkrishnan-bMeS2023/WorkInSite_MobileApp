import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import {Colors} from '../../../utils';

const ContactsEditForm = (props: {contact: Contact; onEdit: () => void}) => {
  const {contact, onEdit} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={onEdit}>
            <Icon name="edit" size={24} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      <ContactTypes contactList={contact} showEditDeleteButtons={false} />
    </View>
  );
};

export {ContactsEditForm};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
    color: '#007bff',
  },
  contactName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
});
