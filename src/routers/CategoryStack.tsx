import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen';
function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
}
export default CategoryStack;
