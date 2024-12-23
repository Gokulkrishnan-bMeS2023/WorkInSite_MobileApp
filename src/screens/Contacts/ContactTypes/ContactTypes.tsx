import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ContactEditDeleteButtons} from '../ContactEditDeleteButtons/ContactEditDeleteButtons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ContactTypesProps} from './DTOs';
import {Colors} from '../../../utils';

const Icons: {[key: string]: JSX.Element} = {
  Phone: <Icon name="phone" size={24} color={Colors.secondaryColor} />,
  Email: <Icon name="email" size={24} color={Colors.secondaryColor} />,
  Address: <Icon name="location-on" size={24} color={Colors.secondaryColor} />,
  DEFAULT: <Icon name="info" size={24} color={Colors.secondaryColor} />,
};

const ContactTypes = (props: ContactTypesProps) => {
  const {contactList, setContactList, showEditDeleteButtons = true} = props;

  return (
    <>
      {contactList.contactDetails.map((item: any, index: any) => (
        <React.Fragment key={index}>
          {item.value && (
            <View
              style={[
                styles.container,
                showEditDeleteButtons ? styles.withButtons : styles.fullWidth,
              ]}>
              <View style={styles.iconAndLabel}>
                <View>{Icons[item.contactType] || Icons.DEFAULT}</View>
                <Text style={styles.label}>{item.value}</Text>
              </View>
              {showEditDeleteButtons && (
                <ContactEditDeleteButtons
                  contactList={contactList}
                  setContactList={setContactList}
                  selectedItem={{id: index, item}}
                />
              )}
            </View>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  withButtons: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  iconAndLabel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 3,
    marginTop: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.black,
    flex: 1,
  },
});

export {ContactTypes};
