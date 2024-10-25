// import React from 'react';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using icons if needed

// const CustomDrawerContent = (props: any) => {
//   const {navigation} = props;

//   return (
//     <DrawerContentScrollView {...props}>
//       {/* Custom Header */}
//       <View style={styles.drawerHeader}>
//         <Text style={styles.drawerHeaderText}>WorkInSite</Text>
//       </View>

//       {/* Custom Drawer Items */}
//       {/* <DrawerItem
//         label="Home"
//         onPress={() => navigation.navigate('HomeTabs')}
//         icon={() => <Icon name="home" size={24} />}
//       /> */}
//       <DrawerItem
//         label="Users"
//         onPress={() => navigation.navigate('Users')}
//         icon={() => <Icon name="account" size={24} />}
//       />
//       <DrawerItem
//         label="Contacts"
//         onPress={() => navigation.navigate('Contacts')}
//         icon={() => <Icon name="contacts" size={24} />}
//       />
//       <DrawerItem
//         label="Clients"
//         onPress={() => navigation.navigate('Clients')}
//         icon={() => <Icon name="briefcase" size={24} />}
//       />
//       <DrawerItem
//         label="Sites"
//         onPress={() => navigation.navigate('Sites')}
//         icon={() => <Icon name="map-marker" size={24} />}
//       />
//       <DrawerItem
//         label="Workers"
//         onPress={() => navigation.navigate('Workers')}
//         icon={() => <Icon name="account-hard-hat" size={24} />}
//       />
//       <DrawerItem
//         label="Suppliers"
//         onPress={() => navigation.navigate('Suppliers')}
//         icon={() => <Icon name="truck" size={24} />}
//       />

//       {/* Custom Logout Button */}
//       {/* <View style={styles.footer}>
//         <TouchableOpacity
//           onPress={() => {
//             // Custom logout logic or navigation to login screen
//             navigation.navigate('Login');
//           }}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View> */}
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerHeader: {
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   drawerHeaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   footer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   logoutText: {
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default CustomDrawerContent;

//2
import React from 'react';
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

const CustomDrawerContent = (props: any) => {
  const {navigation} = props;

  const drawerItems = [
    {label: 'Users', icon: 'account', screen: 'Users'},
    {label: 'Contacts', icon: 'contacts', screen: 'Contacts'},
    {label: 'Clients', icon: 'briefcase', screen: 'Clients'},
    {label: 'Sites', icon: 'map-marker', screen: 'Sites'},
    {label: 'Workers', icon: 'account-hard-hat', screen: 'Workers'},
    {label: 'Suppliers', icon: 'truck', screen: 'Suppliers'},
  ];

  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View style={styles.drawerHeader}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.drawerHeaderText}>WorkInSite</Text>
      </View>

      {/* Custom Drawer Items */}
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
    width: 40, // Adjust as needed
    height: 40, // Adjust as needed
    resizeMode: 'contain',
    marginRight: 10, // Space between logo and text
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
    color: Colors.secondaryColor, // Default icon color
  },
  drawerLabel: {
    fontSize: 16,
    color: Colors.secondaryColor, // Default text color
  },
});

export default CustomDrawerContent;
