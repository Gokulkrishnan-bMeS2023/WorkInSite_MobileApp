
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Share, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ContactDetail, ContactTypes } from '../Contacts/DTOs/ContactProps';
import { Site, SiteStatus } from './DTOs/SiteProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../utils/color';
import Toast from 'react-native-toast-message';
import { SH } from '../../utils';

const SiteCard = (props: { site: Site }) => {
  const { site } = props;

  // Extract phone number from contact details
  const phoneNumber = site.contact.contactDetails.find(
    (item: ContactDetail) => item.contactType === ContactTypes.PHONE
  )?.value;

 
  const onShare = async () => {
    try {
      if (!site.googleLocation) {
        Toast.show({
          type: 'warning',
          text1: 'Warning',
          text2: 'No location URL provided!',
        });
        return;
      }
  
      const result = await Share.share({
        message: `${site.googleLocation}`,
      });
  
      if (result.action === Share.sharedAction) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Location shared successfully!',
        });
      } else if (result.action === Share.dismissedAction) {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Share dismissed by user.',
        });
      }
    } catch (err) {
      const error = err as Error; // Explicitly cast 'err' to 'Error'
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <View style={styles.iconCentered}>
            <Ionicons name="location-outline" size={24} color={Colors.black} />
          </View>
          <Text style={[styles.sitetext, styles.siteName]}>{site.name}</Text>
          <View
            style={[
              styles.statusIndicator,
              site.status === SiteStatus.COMPLETED ? styles.inactiveUser : styles.activeUser,
            ]}
          />
        </View>
        <TouchableOpacity  onPress={() => onShare()}>
          <View style={styles.iconCentered}>
            <Feather
              name="share-2"
              size={24}
              color={Colors.black}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.contactContainer}>
        <View style={styles.iconCentered}>
          <FontAwesome5 name="user-alt" size={24} color={Colors.secondaryColor} />
        </View>
        <Text style={[styles.text, styles.siteName]}>{site.contact.name}</Text>
        {phoneNumber && (
          <TouchableOpacity onPress={(e) => e.stopPropagation()} style={styles.iconCentered}>
            <Feather
              name="phone"
              size={24}
              color={Colors.secondaryColor}
              onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: Colors.boxShadaw,
    shadowOpacity: 0.2,
    shadowRadius: SH(7),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  siteName: {
    marginLeft: 12,
  },
  sitetext: {
    fontSize: 16,
    fontWeight: 700,
    color: Colors.grayColor,
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    color: Colors.grayColor,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  activeUser: {
    backgroundColor: '#198653',
  },
  inactiveUser: {
    backgroundColor: '#DC3848',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPadding: {
    padding: 5,
  },
  iconCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SiteCard };

