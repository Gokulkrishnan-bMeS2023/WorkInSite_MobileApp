import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {RouteName} from '../routers/index';
import CustomDrawer from './CustomDrawer';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import TabNavigator from '../routers/TabNavigator';
import LoginScreen from '../screens/Authantication/LoginScreen';
import RegistrationScreen from '../screens/Authantication/RegistrationScreen';
// import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';

const RootNavigator = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
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
        name={RouteName.SPLASH_SCREEN}
        component={SplashScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen name={RouteName.Home_SCREEN} component={TabNavigator} />
      <Drawer.Screen
        name={RouteName.LOGIN_SCREEN}
        component={LoginScreen}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name={RouteName.REGISTRATION_SCREEN}
        component={RegistrationScreen}
        options={{swipeEnabled: false}}
      />
      {/* <Drawer.Screen
        name={RouteName.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{swipeEnabled: false}}
      /> */}
      {/* <Drawer.Screen
        name={RouteName.PRODUCTLIST_SCREEN}
        component={ProductListScreen}
      /> */}
      {/* <Drawer.Screen
        name={RouteName.PRODUCTDETAILS_SCREEN}
        component={ProductDetailsScreen}
      /> */}
      {/* <Drawer.Screen
        name={RouteName.PRODUCTRANGELIST_SCREEN}
        component={ProductRangeListScreen}
      />
      <Drawer.Screen name={RouteName.BASKET_SCREEN} component={BasketScreen} />
      <Drawer.Screen name={RouteName.SEARCH_SCREEN} component={SearchScreen} />
      <Drawer.Screen
        name={RouteName.EDITPROFILE_SCREEN}
        component={EditProfileScreen}
      />
      <Drawer.Screen
        name={RouteName.FAVOURITE_SCREEN}
        component={FavouriteScreen}
      />
      <Drawer.Screen
        name={RouteName.MANAGEADDRESS_SCREEN}
        component={ManageAddressScreen}
      />
      <Drawer.Screen
        name={RouteName.CHANGEPASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
      <Drawer.Screen
        name={RouteName.POINTBALANCE_SCREEN}
        component={PointBalanceScreen}
      /> */}
    </Drawer.Navigator>
  );
};
export default RootNavigator;


// import { View, Text } from 'react-native'
// import React from 'react'

// export default function RootNavigator() {
//   return (
//     <View>
//       <Text>RootNavigator</Text>
//     </View>
//   )
// }