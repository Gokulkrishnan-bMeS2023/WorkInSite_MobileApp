// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import UsersScreen from '../screens/Users/Users';
// import ContactsScreen from '../screens/Contacts/Contacts';
// import ClientsScreen from '../screens/Clients/Clients';
// import SitesScreen from '../screens/Sites/Sites';
// import WorkersScreen from '../screens/Workers/Workers';
// import SuppliersScreen from '../screens/Suppliers/Suppliers';
// import BottomTabNavigator from './BottomTabNavigator';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Dashboard">
//       <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
//       <Drawer.Screen name="Users" component={UsersScreen} />
//       <Drawer.Screen name="Contacts" component={ContactsScreen} />
//       <Drawer.Screen name="Clients" component={ClientsScreen} />
//       <Drawer.Screen name="Sites" component={SitesScreen} />
//       <Drawer.Screen name="Workers" component={WorkersScreen} />
//       <Drawer.Screen name="Suppliers" component={SuppliersScreen} />
//     </Drawer.Navigator>
//   );
// }

//2

// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import UsersScreen from '../screens/Users/Users';
// import ContactsScreen from '../screens/Contacts/Contacts';
// import ClientsScreen from '../screens/Clients/Clients';
// import SitesScreen from '../screens/Sites/Sites';
// import WorkersScreen from '../screens/Workers/Workers';
// import SuppliersScreen from '../screens/Suppliers/Suppliers';
// import BottomTabNavigator from './BottomTabNavigator';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="HomeTabs">
//       <Drawer.Screen
//         name="HomeTabs"
//         component={BottomTabNavigator}
//         options={{title: 'WorkInSite'}}
//       />
//       <Drawer.Screen name="Users" component={UsersScreen} />
//       <Drawer.Screen name="Contacts" component={ContactsScreen} />
//       <Drawer.Screen name="Clients" component={ClientsScreen} />
//       <Drawer.Screen name="Sites" component={SitesScreen} />
//       <Drawer.Screen name="Workers" component={WorkersScreen} />
//       <Drawer.Screen name="Suppliers" component={SuppliersScreen} />
//     </Drawer.Navigator>
//   );
// }

//3

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UsersScreen from '../screens/Users/Users';
import ContactsScreen from '../screens/Contacts/Contacts';
import ClientsScreen from '../screens/Clients/Clients';
import SitesScreen from '../screens/Sites/Sites';
import WorkersScreen from '../screens/Workers/Workers';
import SuppliersScreen from '../screens/Suppliers/Suppliers';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from './CustomDrawerContent'; // Import custom drawer
import {Dimensions} from 'react-native';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      drawerContent={props => <CustomDrawerContent {...props} />} // Custom Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          flex: 1,
          marginLeft: -10,
          width: screenWidth - 100,
        },
      }}>
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{title: 'WorkInSite'}}
      />
      <Drawer.Screen name="Users" component={UsersScreen} />
      <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="Clients" component={ClientsScreen} />
      <Drawer.Screen name="Sites" component={SitesScreen} />
      <Drawer.Screen name="Workers" component={WorkersScreen} />
      <Drawer.Screen name="Suppliers" component={SuppliersScreen} />
    </Drawer.Navigator>
  );
}
