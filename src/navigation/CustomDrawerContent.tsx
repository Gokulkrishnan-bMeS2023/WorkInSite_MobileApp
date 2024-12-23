import React, {useCallback, useEffect, useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '..';
import {Colors} from '../utils';
import {AuthHelper} from '../helpers/AuthHelper';
import RouteName from './RouteName';

const CustomDrawerContent = (props: any) => {
  const {navigation} = props;

  const [drawerItems, setDrawerItems] = useState([
    {label: 'Users', icon: 'account', screen: RouteName.USER_LIST_SCREEN},
    {
      label: 'Contacts',
      icon: 'contacts',
      screen: RouteName.CONTACT_LIST_SCREEN,
    },
    {label: 'Clients', icon: 'briefcase', screen: RouteName.CLIENT_LIST_SCREEN},
    {label: 'Sites', icon: 'map-marker', screen: RouteName.SITE_LIST_SCREEN},
    {
      label: 'Workers',
      icon: 'account-hard-hat',
      screen: RouteName.WORKER_LIST_SCREEN,
    },
    {label: 'Suppliers', icon: 'truck', screen: RouteName.SUPPLIER_LIST_SCREEN},
  ]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const profile = await AuthHelper.getUserProfile();

      setDrawerItems(currentItems => {
        if (profile?.role?.name === 'Supervisor') {
          return currentItems.filter(item => item.label !== 'Users');
        }
        return currentItems;
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.drawerHeaderText}>WorkInSite</Text>
      </View>
      {drawerItems.map((item, index) => {
        const scaleAnim = new Animated.Value(1);

        const handlePressIn = () => {
          Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
          }).start();
        };

        const handlePressOut = () => {
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        return (
          <TouchableOpacity
            key={index}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={1}>
            <Animated.View
              style={[styles.drawerItem, {transform: [{scale: scaleAnim}]}]}>
              <Icon name={item.icon} size={24} style={styles.icon} />
              <Text style={styles.drawerLabel}>{item.label}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 5,
  },
  icon: {
    marginRight: 20,
    color: Colors.secondaryColor,
  },
  drawerLabel: {
    fontSize: 16,
    color: Colors.secondaryColor,
  },
});

export default CustomDrawerContent;
