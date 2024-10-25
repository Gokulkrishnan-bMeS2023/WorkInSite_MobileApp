// // import React from 'react';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { TouchableOpacity, View, Image } from 'react-native';
// // import images from '../images/index';
// // const Tab = createBottomTabNavigator();
// // import HomeStack from './HomeStack';
// // import CategoryStack from './CategoryStack';
// // import OrderStack from './OrderStack';
// // import ProfileStack from './ProfileStack';
// // import { Fonts, Colors } from '../utils';
// // import Style from '../styles/commonStyle';
// // import RouteName from './RouteName';
// // const TabNavigator = ({ navigation }:any) => {
// //   return (
// //     <Tab.Navigator initialRouteName="Home"
// //       screenOptions={{
// //         tabBarShowLabel: true,
// //         tabBarActiveTintColor: Colors.white_text_color,
// //         tabBarInactiveTintColor: Colors.primary_color,
// //         tabBarActiveBackgroundColor: Colors.primary_color,
// //         tabBarInactiveBackgroundColor: Colors.secondary_color,
// //         tabBarStyle: {
// //           width: '100%',
// //           alignSelf: 'center',
// //           backgroundColor: Colors.white_text_color,
// //           overflow: 'hidden',
// //           height: 65,
// //           borderTopWidth: 1,
// //         },
// //         tabBarLabelStyle: { fontSize: 12, fontFamily: Fonts.Inter_SemiBold, bottom: 3 }
// //       }}>
// //       <Tab.Screen name="Home" component={HomeStack}
// //         options={{
// //           tabBarLabel: 'Home',
// //           title: null, headerShown: true,
// //           headerShadowVisible: false,
// //           headerLeft: () => (
// //             <View style={Style.flexrowsetaddresh}>
// //               <TouchableOpacity onPress={() => navigation.openDrawer()}>
// //                 {/* <Image source={images.hamburger} resizeMode="contain" style={Style.homeIcon} /> */}
// //               </TouchableOpacity>
// //               <Image source={images.logo} resizeMode="contain" style={Style.homeLogo} />
// //             </View>
// //           ),
// //           headerRight: () => (
// //             <View style={Style.flexrowsethomeheaderright}>
// //               <TouchableOpacity onPress={() => navigation.navigate(RouteName.BASKET_SCREEN)}>
// //                 <Image source={images.cart} resizeMode="contain" style={Style.homeIcon} />
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => navigation.navigate(RouteName.NOTIFICATION_SCREEN)}>
// //                 <Image source={images.bell} resizeMode="contain" style={Style.homeIcon} />
// //               </TouchableOpacity>
// //             </View>
// //           ),
// //           tabBarIcon: ({ focused }) => (
// //             <Image
// //               source={images.home}
// //               resizeMode="contain"
// //               style={{ width: 24, height: 24, tintColor: focused ? Colors.white_text_color : Colors.primary_color }} />
// //           )
// //         }} />
// //       <Tab.Screen name="Category" component={CategoryStack}
// //         options={{
// //           tabBarLabel: 'Category',
// //           headerShown: false,
// //           tabBarIcon: ({ focused }) => (
// //             <Image
// //               source={images.category}
// //               resizeMode="contain"
// //               style={{ width: 24, height: 24, tintColor: focused ? Colors.white_text_color : Colors.primary_color }} />
// //           )
// //         }} />
// //       <Tab.Screen name="Orders" component={OrderStack}
// //         options={{
// //           tabBarLabel: 'Orders',
// //           headerShown: false,
// //           tabBarIcon: ({ focused }) => (
// //             <Image
// //               source={images.order}
// //               resizeMode="contain"
// //               style={{ width: 24, height: 24, tintColor: focused ? '#FFFFFF' : '#31b0c5', }} />
// //           )
// //         }} />
// //       <Tab.Screen name="Profile" component={ProfileStack}
// //         options={{
// //           tabBarLabel: 'Profile',
// //           headerShown: false,
// //           tabBarIcon: ({ focused }) => (
// //             <Image
// //               source={images.member}
// //               resizeMode="contain"
// //               style={{ width: 24, height: 24, tintColor: focused ? '#FFFFFF' : '#31b0c5', }} />
// //           )
// //         }} />
// //     </Tab.Navigator>
// //   )
// // }

// // export default TabNavigator;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import CategoryStack from './CategoryStack';
import OrderStack from './OrderStack';
import ProfileStack from './ProfileStack';
import {Fonts, Colors} from '../utils';
import Style from '../styles/commonStyle';
import RouteName from './RouteName';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.white_text_color,
        tabBarInactiveTintColor: Colors.primary_color,
        tabBarActiveBackgroundColor: Colors.primary_color,
        tabBarInactiveBackgroundColor: Colors.secondary_color,
        tabBarStyle: {
          width: '100%',
          alignSelf: 'center',
          backgroundColor: Colors.white_text_color,
          overflow: 'hidden',
          height: 65,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Fonts.Inter_SemiBold,
          bottom: 3,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={Style.flexrowsetaddresh}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {/* Replace the icon as needed */}
                <MaterialIcons
                  name="menu"
                  size={24}
                  color={Colors.primary_color}
                />
              </TouchableOpacity>
              <MaterialIcons
                name="store"
                size={24}
                color={Colors.primary_color}
                style={Style.homeLogo}
              />
            </View>
          ),
          headerRight: () => (
            <View style={Style.flexrowsethomeheaderright}>
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteName.BASKET_SCREEN)}>
                <MaterialIcons
                  name="shopping-cart"
                  size={24}
                  color={Colors.primary_color}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteName.NOTIFICATION_SCREEN)
                }>
                <MaterialIcons
                  name="notifications"
                  size={24}
                  color={Colors.primary_color}
                />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="home"
              size={24}
              color={focused ? Colors.white_text_color : Colors.primary_color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryStack}
        options={{
          tabBarLabel: 'Category',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="category"
              size={24}
              color={focused ? Colors.white_text_color : Colors.primary_color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarLabel: 'Orders',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="assignment"
              size={24}
              color={focused ? Colors.white_text_color : Colors.primary_color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="person"
              size={24}
              color={focused ? Colors.white_text_color : Colors.primary_color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;


//2

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;
