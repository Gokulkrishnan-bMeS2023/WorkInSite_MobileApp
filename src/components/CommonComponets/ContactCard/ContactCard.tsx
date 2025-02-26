import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomAvatar from '../../../screens/ProfileScreen/CustomAvatar';
import { Colors } from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ContactCardProps {
  name: string;
  imgURL?: string;
  phone?: string;
  email?: string;
  text?: string;
  onDelete: () => void;
}

const ContactCard = ({
  name,
  imgURL,
  phone,
  email,
  text,
  onDelete,
}: ContactCardProps) => {
  const handlePhonePress = () => {
    if (phone) {
      const cleanedPhoneNumber = phone.replace(/[^\d]/g, '');
      Linking.openURL(`tel:${cleanedPhoneNumber}`);
    }
  };

  const handleEmailPress = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View style={styles.card}>
      <CustomAvatar
        name={name}
        imageUri={imgURL}
        size={75}
        backgroundColor={Colors.primaryColor}
        textColor={Colors.secondaryColor}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        {phone && (
          <View style={styles.contactRow}>
            <FontAwesome name="phone" size={16} color={Colors.secondaryColor} />
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={styles.contactText}>{phone}</Text>
            </TouchableOpacity>
          </View>
        )}
        {email && (
          <View style={styles.contactRow}>
            <Icon name="email" size={16} color={Colors.secondaryColor} />
            <TouchableOpacity onPress={handleEmailPress}>
              <Text
                style={[styles.contactText, styles.emailText]}
                numberOfLines={1}
                ellipsizeMode="middle">
                {email}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {text && (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
        <Icon name="delete" size={20} color={Colors.dangerColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.grayColor,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  contactText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.grayColor,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
  emailText: {
    flexShrink: 1,
    alignSelf: 'flex-start',
  },
  deleteIcon: {
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    marginTop: 2,
    color: Colors.grayColor,
  }
});

export default ContactCard;
