// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
// import {Colors, Fonts} from '../utils';

// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName: string = 'home'; // Default icon (e.g., for safety)

//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'History':
//               iconName = 'history';
//               break;
//             case 'Settings':
//               iconName = 'cog';
//               break;
//             case 'Profile':
//               iconName = 'account';
//               break;
//           }

//           return <Icon name={iconName ?? 'home'} size={size} color={color} />;
//         },
//         // tabBarActiveTintColor: Colors.primaryColor, // Active tab color
//         // tabBarInactiveTintColor: Colors.secondaryColor, // Inactive tab color

//         //2

//         tabBarShowLabel: true,
//         tabBarActiveTintColor: Colors.white_text_color,
//         tabBarInactiveTintColor: Colors.primaryColor,
//         tabBarActiveBackgroundColor: Colors.primaryColor,
//         tabBarInactiveBackgroundColor: Colors.secondaryColor,
//         tabBarStyle: {
//           width: '100%',
//           alignSelf: 'center',
//           backgroundColor: Colors.white_text_color,
//           overflow: 'hidden',
//           height: 65,
//           borderTopWidth: 1,
//           // margin: 10,
//           // borderRadius: 50,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontFamily: Fonts.Inter_Bold,
//           bottom: 3,
//         },
//       })}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{headerShown: true}}
//       />
//       <Tab.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{headerShown: false}}
//       />
//     </Tab.Navigator>
//   );
// }

//2

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import {Colors, Fonts} from '../utils';
import images from '..';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({navigation}: any) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = 'home'; // Default icon

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'History':
              iconName = 'history';
              break;
            case 'Settings':
              iconName = 'cog';
              break;
            case 'Profile':
              iconName = 'account';
              break;
          }

          return <Icon name={iconName ?? 'home'} size={size} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.white_text_color,
        tabBarInactiveTintColor: Colors.primaryColor,
        tabBarActiveBackgroundColor: Colors.primaryColor,
        tabBarInactiveBackgroundColor: Colors.secondaryColor,
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
          fontFamily: Fonts.Inter_Bold,
          bottom: 3,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: '',
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={style.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {/* Replacing Image with Vector Icon */}
                <Icon name="menu" size={30} color={Colors.secondaryColor} />
              </TouchableOpacity>
              {/* <Icon name="home-city-outline" style={style.logo} /> */}
              <Image source={images.logo} style={style.logo} />
              <Text style={style.heading}>WorkInSite</Text>
            </View>
          ),
          headerRight: () => (
            <View style={style.headerRight}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationScreen')}>
                {/* Replacing Image with Vector Icon */}
                <Icon style={style.notification} name="bell" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  logo: {
    height:35,
    resizeMode: 'contain',
    // backgroundColor:"red",
    width:40
  },
  notification: {
    fontSize: 30,
    fontFamily: Fonts.Inter_Bold,
    color: Colors.secondaryColor,
  },
  heading: {
    fontSize: 25,
    fontFamily: Fonts.Inter_Bold,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
});
