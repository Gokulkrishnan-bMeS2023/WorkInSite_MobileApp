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

//3

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer for the splash screen duration
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide splash screen after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? <SplashScreen  /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
