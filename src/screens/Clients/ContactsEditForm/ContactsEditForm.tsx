import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Contact} from '../../Contacts/DTOs/ContactProps';
import {ContactTypes} from '../../Contacts/ContactTypes/ContactTypes';
import {Colors} from '../../../utils';
import Icon from '../../../utils/VectorIcons';
import commonStyle from '../../../styles/commonStyle';
import Styles from '../../../styles/CreateAndEditScreenStyle';
const ContactsEditForm = (props: {contact: Contact; onEdit: () => void}) => {
  const {contact, onEdit} = props;
  return (
    <View style={commonStyle.container}>
      <View style={Styles.spaceContainer}>
        <Text style={commonStyle.label}>{contact.name}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={onEdit}>
            <Icon
              icon="MaterialIcons"
              name="edit"
              size={24}
              color={Colors.secondaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ContactTypes contactList={contact} showEditDeleteButtons={false} />
    </View>
  );
};
export {ContactsEditForm};
