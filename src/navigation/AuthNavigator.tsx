// import React, {useEffect, useState} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import LoginScreen from '../screens/Authantication/LoginScreen';
// import RegisterScreen from '../screens/Authantication/RegistrationScreen';
// import DrawerNavigator from './DrawerNavigator';
// import {AuthHelper} from '../helpers/AuthHelper';

// const Stack = createNativeStackNavigator();

// export default function AuthNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function checkLoginStatus() {
//       const token = await AuthHelper.getAccessToken();
//       setIsLoggedIn(!!token);
//       setLoading(false);
//     }
//     checkLoginStatus();
//   }, []);

//   if (loading) {
//     return null; // Add a loading indicator here
//   }

//   return (
//     <Stack.Navigator initialRouteName="Login">
//       {isLoggedIn ? (
//         <Stack.Screen
//           name="Dashboard"
//           component={DrawerNavigator}
//           options={{headerShown: false}}
//         />
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

//2
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';
import {AuthHelper} from '../helpers/AuthHelper';
import LoginScreen from '../screens/Authantication/LoginScreen';
import RegisterScreen from '../screens/Authantication/RegistrationScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await AuthHelper.getAccessToken();
      setIsLoggedIn(!!token);
      setLoading(false);
    }
    checkLoginStatus();
  }, []);

  if (loading) {
    return null; // Add a loading indicator or splash screen here
  }

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}>
      {isLoggedIn ? (
        <Stack.Screen
          name="MainApp"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
