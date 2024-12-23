// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import React from 'react';
// import LoginScreen from './src/screens/Authantication/LoginScreen';

// export default function App() {
//   return (
//     // <SafeAreaView>
//     //   <StatusBar />
//     <ScrollView
//       keyboardShouldPersistTaps="handled"
//       contentContainerStyle={{width: '100%', height: 'auto'}}>
//       <KeyboardAvoidingView enabled>
//         <LoginScreen />
//       </KeyboardAvoidingView>
//     </ScrollView>
//     // </SafeAreaView>
//   );
// }

// 2
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './src/navigation/AuthNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthNavigator />
//     </NavigationContainer>
//   );
// }

// //3

// import React, {useState, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './src/navigation/AuthNavigator';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
// import {UserProvider} from './src/context/UserContext';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Set a timer for the splash screen duration
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Hide splash screen after 1.5 seconds
//     }, 1500);

//     return () => clearTimeout(timer); // Clear timer on component unmount
//   }, []);

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <UserProvider>
//         <NavigationContainer>
//           {isLoading ? <SplashScreen /> : <AuthNavigator />}
//         </NavigationContainer>
//       </UserProvider>
//     </GestureHandlerRootView>
//   );
// }

//7

// import React, {useState, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './src/navigation/AuthNavigator';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
// import {UserProvider} from './src/context/UserContext';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import DrawerNavigator from './src/navigation/DrawerNavigator';

// export default function App() {
//   return (
//     <UserProvider>
//       <NavigationContainer>
//         <DrawerNavigator />
//       </NavigationContainer>
//     </UserProvider>
//   );
// }

//8

// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// export function AppNavigator({isLoggedIn}: {isLoggedIn: boolean}) {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       {!isLoggedIn ? (
//         <Stack.Screen name="Login" component={LoginScreen} />
//       ) : (
//         <Stack.Screen name="Main" component={BottomTabNavigator} />
//       )}
//     </Stack.Navigator>
//   );
// }

// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from './src/screens/SplashScreen/SplashScreen';
// import LoginScreen from './src/screens/Authantication/LoginScreen';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import {AuthHelper} from './src/helpers/AuthHelper';
// import {UserProvider} from './src/context/UserContext';

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const token = await AuthHelper.getAccessToken();
//       setIsLoggedIn(!!token);
//       setIsLoading(false);
//     };
//     checkLoginStatus();
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//   return (
//     <UserProvider>
//       <NavigationContainer>
//         <AppNavigator isLoggedIn={isLoggedIn} />
//       </NavigationContainer>
//     </UserProvider>
//   );
// };

// export default App;

//9
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import DrawerNavigator from './src/navigation/DrawerNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// }

//10

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import OfflineScreen from './src/screens/OfflineScreen.tsx/OfflineScreen';

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {isConnected ? (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      ) : (
        <OfflineScreen />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
