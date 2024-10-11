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

// export default App;

//2

// src/LoginScreen.js
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    if (!phoneNumber || !pin) {
      Alert.alert('Error', 'Please enter both phone number and PIN');
      return;
    }

    if (pin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits');
      return;
    }

    try {
      const response = await fetch(
        'https://sygycm9raj.ap-south-1.awsapprunner.com/user-service/v1/auth/login',
        {
          method: 'POST',
          headers: {
            accept: 'text/plain', // matches your cURL request header
            'Content-Type': 'application/json', // matches your cURL request header
          },
          body: JSON.stringify({
            phone: phoneNumber, // use "phone" instead of "phoneNumber" to match your cURL
            password: pin, // use "password" instead of "pin" to match your cURL
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        // Handle successful login (e.g., navigation or token storage)
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong');
      // Alert.alert(error || 'Something went wrong');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        maxLength={10}
      />

      <Text style={styles.label}>4-Digit PIN:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={pin}
        onChangeText={setPin}
        placeholder="Enter 4-digit PIN"
        secureTextEntry={true}
        maxLength={4}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default LoginScreen;
