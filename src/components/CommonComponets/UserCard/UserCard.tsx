import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomAvatar from '../../../screens/ProfileScreen/CustomAvatar';
import {Colors} from '../../../utils';

interface UserCardProps {
  name: string;
  imgURL?: any;
  role: string;
  phoneNumber: string;
  isActive: boolean;
}

const UserCard = ({
  name,
  imgURL,
  role,
  phoneNumber,
  isActive,
}: UserCardProps) => {
  const handlePhonePress = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    Linking.openURL(`tel:${cleanedPhoneNumber}`);
  };

  return (
    <View style={styles.cardContent}>
      <CustomAvatar
        name={name}
        imageUri={imgURL}
        size={75}
        backgroundColor={Colors.primaryColor}
        textColor={Colors.secondaryColor}
        // imageUri={'https://randomuser.me/api/portraits/men/1.jpg'}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <View style={styles.phoneContainer}>
          <Icon
            name="phone-iphone"
            size={16}
            color={Colors.secondaryColor}
            onPress={handlePhonePress}
          />
          <Text style={styles.phoneNumber} onPress={handlePhonePress}>
            {phoneNumber}
          </Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.status}>
          <View
            style={[
              styles.statusIndicator,
              isActive ? styles.active : styles.inactive,
            ]}
          />
        </View>
        <Icon
          style={styles.arrow}
          name="arrow-forward"
          size={20}
          color={'#ccc'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.black,
  },
  role: {
    fontSize: 14,
    color: Colors.grayColor,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    color: Colors.secondaryColor,
    marginLeft: 6,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    flexGrow: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  active: {
    backgroundColor: 'green',
  },
  inactive: {
    backgroundColor: 'red',
  },
  statusText: {
    fontSize: 12,
  },
  activeText: {
    color: 'green',
  },
  inactiveText: {
    color: 'red',
  },
  arrow: {
    opacity: 0.5,
  },
});

export default UserCard;
