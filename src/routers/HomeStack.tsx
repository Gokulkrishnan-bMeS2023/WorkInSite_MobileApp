import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from '../screens/HomeScreen/HomeScreen';
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />            
        </Stack.Navigator>
    );
}
export default HomeStack;