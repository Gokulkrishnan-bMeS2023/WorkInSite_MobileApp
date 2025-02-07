import React from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import {useSupervisorListForm} from './useSupervisorListForm';
import {SupervisorListFormProps} from './DTOs';
import {Colors} from '../../../utils';
import Icon from '../../../utils/VectorIcons';
import Styles from '../../../styles/CreateAndEditScreenStyle';
import commonStyle from '../../../styles/commonStyle';

const SupervisorListForm = (props: SupervisorListFormProps) => {
  const {supervisorList, handleSupervisorDelete} = useSupervisorListForm(props);

  const handlePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to make a call', err),
    );
  };

  return (
    <>
      {supervisorList.map(supervisor => (
        <View style={Styles.spaceContainer} key={supervisor.id}>
          <View style={commonStyle.header}>
            <View style={Styles.badge}>
              <Text style={Styles.badgeText}>{supervisor.name[0]}</Text>
            </View>
            <Text>{supervisor.name}</Text>
          </View>
          <View style={Styles.iconContainer}>
            <TouchableOpacity onPress={() => handlePhoneCall(supervisor.phone)}>
              <Icon
                icon="MaterialCommunityIcons"
                name="phone"
                size={24}
                color={Colors.secondaryColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSupervisorDelete(supervisor.id)}>
              <Icon
                icon="MaterialCommunityIcons"
                name="delete"
                size={26}
                color={Colors.dangerColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

export {SupervisorListForm};
