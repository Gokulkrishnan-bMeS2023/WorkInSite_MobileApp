import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
function OrderStack() {
    return (
        <Stack.Navigator initialRouteName="OrdersScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />            
        </Stack.Navigator>
    );
}
export default OrderStack;