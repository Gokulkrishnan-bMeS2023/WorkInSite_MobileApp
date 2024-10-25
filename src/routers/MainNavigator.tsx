import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Authantication/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
