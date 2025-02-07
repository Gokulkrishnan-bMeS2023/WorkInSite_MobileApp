// import React, {useCallback, useEffect, useState} from 'react';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import images from '..';
// import {Colors} from '../utils';
// import {AuthHelper} from '../helpers/AuthHelper';
// import RouteName from './RouteName';
// import {useDrawerStatus} from '@react-navigation/drawer';
// const CustomDrawerContent = (props: any) => {
//   const {navigation} = props;
//   const drawerStatus = useDrawerStatus();
//   const initialRouteName = [
//     {label: 'Users', icon: 'account', screen: RouteName.USER_LIST_SCREEN},
//     {
//       label: 'Contacts',
//       icon: 'contacts',
//       screen: RouteName.CONTACT_LIST_SCREEN,
//     },
//     {label: 'Clients', icon: 'briefcase', screen: RouteName.CLIENT_LIST_SCREEN},
//     {label: 'Sites', icon: 'map-marker', screen: RouteName.SITE_LIST_SCREEN},
//     // {
//     //   label: 'Workers',
//     //   icon: 'account-hard-hat',
//     //   screen: RouteName.WORKER_LIST_SCREEN,
//     // },
//     {
//       label: 'Workers',
//       icon: 'account-hard-hat',
//       submenus: [
//         { label: 'Worker Category',screen: RouteName.CLIENT_LIST_SCREEN },
//         { label: 'Wage Type',screen: RouteName.CLIENT_LIST_SCREEN},
//         { label: 'Worker shifts',screen: RouteName.CLIENT_LIST_SCREEN},
//         { label: 'Timing',screen: RouteName.CLIENT_LIST_SCREEN},
//       ],
//     },
//     {label: 'Suppliers', icon: 'truck', screen: RouteName.SUPPLIER_LIST_SCREEN},
//     {label: 'Materials', icon: 'truck', screen: RouteName.MATERIAL_CREATION_SCREEN},
//   ];
//   const [drawerItems, setDrawerItems] = useState(initialRouteName);
//   const fetchUserProfile = useCallback(async () => {
//     try {
//       const profile = await AuthHelper.getUserProfile();
//       if (profile?.role?.name === 'Supervisor') {
//         setDrawerItems(initialRouteName.filter(item => item.label !== 'Users'));
//       } else {
//         setDrawerItems(initialRouteName);
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   }, []);
//   useEffect(() => {
//     if (drawerStatus === 'open') {
//       fetchUserProfile();
//     }
//   }, [drawerStatus]);
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerHeader}>
//         <Image source={images.logo} style={styles.logo} />
//         <Text style={styles.drawerHeaderText}>WorkInSite</Text>
//       </View>
//       {drawerItems.map((item, index) => {
//         const scaleAnim = new Animated.Value(1);
//         const handlePressIn = () => {
//           Animated.spring(scaleAnim, {
//             toValue: 0.95,
//             useNativeDriver: true,
//           }).start();
//         };
//         const handlePressOut = () => {
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             useNativeDriver: true,
//           }).start();
//         };
//         return (
//           <TouchableOpacity
//             key={index}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//             onPress={() => navigation.navigate(item.screen)}
//             activeOpacity={1}>
//             <Animated.View
//               style={[styles.drawerItem, {transform: [{scale: scaleAnim}]}]}>
//               <Icon name={item.icon} size={24} style={styles.icon} />
//               <Text style={styles.drawerLabel}>{item.label}</Text>
//             </Animated.View>
//           </TouchableOpacity>
//         );
//       })}
//     </DrawerContentScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   drawerHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F4F4F4',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   drawerHeaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.secondaryColor,
//   },
//   drawerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     marginVertical: 5,
//   },
//   icon: {
//     marginRight: 20,
//     color: Colors.secondaryColor,
//   },
//   drawerLabel: {
//     fontSize: 16,
//     color: Colors.secondaryColor,
//   },
// });
// export default CustomDrawerContent;

import React, { useCallback, useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
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
import { Colors } from '../utils';
import { AuthHelper } from '../helpers/AuthHelper';
import RouteName from './RouteName';
import { useDrawerStatus } from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;
  const drawerStatus = useDrawerStatus();

  const initialRouteName = [
    { label: 'Users', icon: 'account', screen: RouteName.USER_LIST_SCREEN },
    {
      label: 'Contacts',
      icon: 'contacts',
      screen: RouteName.CONTACT_LIST_SCREEN,
    },
    { label: 'Clients', icon: 'briefcase', screen: RouteName.CLIENT_LIST_SCREEN },
    { label: 'Sites', icon: 'map-marker', screen: RouteName.SITE_LIST_SCREEN },
    {
      label: 'Workers',
      icon: 'account-hard-hat',
      submenus: [
        { label: 'Worker', screen: RouteName.WORKER_LIST_SCREEN },
        {
          label: 'Worker Category',
          screen: RouteName.WORKER_CATEGORY_LIST_SCREEN,
        },
        { label: 'Work Rate Abstract', screen: RouteName.WORK_RATE_ABSTRACT },

        // {label: 'Wage Type', screen: RouteName.WAGE_TYPE},
        // {label: 'Work Type', screen: RouteName.WORK_TYPE},
        // {label: 'Worker Role', screen: RouteName.WORKER_ROLE},
      ],
    },
    { label: 'Suppliers', icon: 'truck', screen: RouteName.SUPPLIER_LIST_SCREEN },
    {
      label: 'Materials',
      icon: 'truck',
      submenus: [
        { label: 'Unit', screen: RouteName.UNIT_CREATION_SCREEN },
        { label: 'Material', screen: RouteName.MATERIAL_LIST_SCREEN },
        { label: 'Purchase', screen: RouteName.PURCHASE_LIST_SCREEN },
        {
          label: 'PurchaseMaterial',
          screen: RouteName.PURCHASEMATERIAL_CREATION_SCREEN,
        },
      ],
    },
  ];

  const [drawerItems, setDrawerItems] = useState(initialRouteName);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const profile = await AuthHelper.getUserProfile();
      if (profile?.role?.name === 'Supervisor') {
        setDrawerItems(initialRouteName.filter(item => item.label !== 'Users'));
      } else {
        setDrawerItems(initialRouteName);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  useEffect(() => {
    if (drawerStatus === 'open') {
      fetchUserProfile();
    } else {
      setOpenMenu(null);
    }
  }, [drawerStatus]);

  const handleToggleSubMenu = (label: string) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

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
          <View key={index}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => {
                if (item.submenus) {
                  handleToggleSubMenu(item.label);
                } else {
                  navigation.navigate(item.screen);
                }
              }}
              activeOpacity={1}>
              <Animated.View
                style={[styles.drawerItem, { transform: [{ scale: scaleAnim }] }]}>
                <Icon name={item.icon} size={24} style={styles.icon} />
                <Text style={styles.drawerLabel}>{item.label}</Text>
                {item.submenus && (
                  <Icon
                    name={
                      openMenu === item.label ? 'chevron-up' : 'chevron-down'
                    }
                    size={24}
                    style={styles.rightIcon}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>

            {/* Submenu */}
            {openMenu === item.label && item.submenus && (
              <View style={styles.submenuContainer}>
                {item.submenus.map((submenu, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => navigation.navigate(submenu.screen)}
                    style={styles.submenuItem}>
                    <Text style={styles.submenuLabel}>{submenu.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
    backgroundColor: '#F4F4F4',
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
    backgroundColor: '#FFFFFF',
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
  rightIcon: {
    marginLeft: 'auto', // Move icon to the right
  },
  submenuContainer: {
    paddingLeft: 40,
    paddingTop: 5,
    backgroundColor: '#f4f4f4',
  },
  submenuItem: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  submenuLabel: {
    fontSize: 16,
    color: Colors.secondaryColor,
  },
});

export default CustomDrawerContent;
