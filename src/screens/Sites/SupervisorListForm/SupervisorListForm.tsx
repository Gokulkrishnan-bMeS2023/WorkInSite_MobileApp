
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Or another icon set
import { useSupervisorListForm } from './useSupervisorListForm';
import { SupervisorListFormProps } from './DTOs';
import { Colors } from '../../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const SupervisorListForm = (props: SupervisorListFormProps) => {
  const { supervisorList, handleSupervisorDelete } = useSupervisorListForm(props);

  const handlePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Failed to make a call', err));
  };

  return (
    <>
      {supervisorList.map((supervisor) => (
        <View style={styles.supervisorItem} key={supervisor.id}>
          <View style={styles.supervisorInfo}>
           
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{supervisor.name[0]}</Text>
            </View>
            <Text style={styles.supervisorName}>{supervisor.name}</Text>
          </View>
          <View style={styles.iconsContainer}>
            
            <TouchableOpacity onPress={() => handlePhoneCall(supervisor.phone)}>
              <Icon name="phone" size={24} color={Colors.secondaryColor} />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => handleSupervisorDelete(supervisor.id)}>
              <MaterialIcons name="delete" size={30} color={Colors.dangerColor} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  supervisorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  supervisorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  supervisorName: {
    marginLeft: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIcon: {
    marginLeft: 12,
  },
});

export { SupervisorListForm };
