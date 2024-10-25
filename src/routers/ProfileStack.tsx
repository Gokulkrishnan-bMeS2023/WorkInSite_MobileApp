import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />            
        </Stack.Navigator>
    );
}
export default ProfileStack;