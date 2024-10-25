// //1
// import React, {useState} from 'react';
// import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
// import PinInput from '../../components/CommonComponets/Pin/Pin';
// import Input from '../../components/CommonComponets/Input/input';
// import ToastNotification from '../../components/CommonComponets/Toast/Toast';
// import Toast from 'react-native-toast-message';
// import Button from '../../components/CommonComponets/Button/Button';
// import {SH} from '../../utils';
// import {AuthHelper} from '../../helpers/AuthHelper';
// import {AuthService} from '../../services/AuthService';
// import {useUserService} from '../../services/UserService';
// import {DevSettings} from 'react-native';

// const LoginScreen = ({navigation}: any) => {
//   const [pin, setPin] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [pinErrorMessage, setPinErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const userService = useUserService();

//   const handlePinChange = (pin: string) => {
//     setPin(pin);
//     if (pin.length !== 4) {
//       setPinErrorMessage('Please enter a 4-digit PIN.');
//     } else {
//       setPinErrorMessage('');
//     }
//   };

//   const handlePhoneNumberChange = (text: string) => {
//     const phoneRegex = /^[0-9\b]+$/;
//     if (text === '' || phoneRegex.test(text)) {
//       setPhoneNumber(text);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Please enter a valid phone number.');
//     }
//   };

//   const handleLogin = async () => {
//     let valid = true;

//     if (phoneNumber.length !== 10) {
//       setErrorMessage('Please enter a valid 10-digit phone number.');
//       valid = false;
//     }

//     if (pin.length !== 4) {
//       setPinErrorMessage('Please enter a 4-digit PIN.');
//       valid = false;
//     }

//     if (!valid) return;

//     setLoading(true); // Show loading indicator

//     try {
//       // Call AuthService to get the access token
//       const accessToken = await AuthService.login(phoneNumber, pin);

//       // Save access token and navigate to the next screen (Dashboard)
//       AuthHelper.setAccessToken(accessToken);
//       const user = await userService.getProfile();
//       // const user = await axios.get(
//       //   'https://sygycm9raj.ap-south-1.awsapprunner.com/user-service/v1/users/profile',
//       //   {
//       //     headers: {
//       //       accept: 'text/plain',
//       //       _at: accessToken, // Add the accessToken here
//       //     },
//       //   },
//       // );
//       // console.log(user.data);

//       AuthHelper.setUserProfile(user);
//       console.log(user);
//       DevSettings.reload();

//       // Navigation to the next screen (adjust as needed)

//       //log
//       // const token = await AuthHelper.getAccessToken();
//       // console.log('getss', token);

//       // navigation.replace('Dashboard');
//     } catch (error: any) {
//       setErrorMessage(error.message || 'An error occurred. Please try again.');
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: error.message || 'Something went wrong!',
//       });
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   return (
//     <View style={styles.screen}>
//       <Input
//         title="Phone Number"
//         placeholder="Enter your phone number"
//         value={phoneNumber}
//         onChangeText={handlePhoneNumberChange}
//         inputType="phone-pad"
//         maxLength={10}
//         errorMessage={errorMessage}
//         required={true}
//       />
//       <View style={styles.PinContainer}>
//         <Text style={styles.title}>PIN</Text>
//         <Text style={styles.pinLabel}>*</Text>
//       </View>
//       <PinInput
//         pinLength={4}
//         secureTextEntry={true}
//         onPinChange={handlePinChange}
//       />
//       {pinErrorMessage ? (
//         <Text style={styles.errorText}>{pinErrorMessage}</Text>
//       ) : null}
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <View style={styles.button}>
//           <Button onPress={handleLogin} title="Login" />
//         </View>
//       )}
//       <ToastNotification />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     padding: SH(25),
//     justifyContent: 'center',
//   },
//   PinContainer: {
//     flexDirection: 'row',
//     gap: 4,
//   },
//   pinLabel: {
//     color: 'red',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//     color: 'black',
//   },
//   button: {
//     marginVertical: 20,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 5,
//   },
// });

// export default LoginScreen;

//2

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  DevSettings,
  StatusBar,
} from 'react-native';
import Svg, {Polygon} from 'react-native-svg'; // Import SVG components
import PinInput from '../../components/CommonComponets/Pin/Pin';
import Input from '../../components/CommonComponets/Input/input';
import ToastNotification from '../../components/CommonComponets/Toast/Toast';
import Toast from 'react-native-toast-message';
import Button from '../../components/CommonComponets/Button/Button';
import images from '../../images';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native';
import Colors from '../../utils/color';
import {AuthHelper} from '../../helpers/AuthHelper';
import {AuthService} from '../../services/AuthService';
import {useUserService} from '../../services/UserService';
const LOGIN_URL =
  'https://sygycm9raj.ap-south-1.awsapprunner.com/user-service/v1/auth/login';
const {width, height} = Dimensions.get('window'); // Get the screen dimensions
const containerHeight = height / 2.4; // Set the height for the SVG
const LoginScreen = () => {
  const [pin, setPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pinErrorMessage, setPinErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userService = useUserService();

  const handlePinChange = (pin: string) => {
    setPin(pin);
    if (pin.length !== 4) {
      setPinErrorMessage('Please enter a 4-digit PIN.');
    } else {
      setPinErrorMessage('');
    }
  };
  const handlePhoneNumberChange = (text: string) => {
    const phoneRegex = /^[0-9\b]+$/;
    if (text === '' || phoneRegex.test(text)) {
      setPhoneNumber(text);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid phone number.');
    }
  };
  const handleLogin = async () => {
    let valid = true;
    if (phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      valid = false;
    }
    if (pin.length !== 4) {
      setPinErrorMessage('Please enter a 4-digit PIN.');
      valid = false;
    }
    if (!valid) return;
    setLoading(true); // Show loading indicator
    try {
      setErrorMessage('');
      const accessToken = await AuthService.login(phoneNumber, pin);
      AuthHelper.setAccessToken(accessToken);
      const user = await userService.getProfile();
      AuthHelper.setUserProfile(user);
      DevSettings.reload();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your action was successful!',
      });
    } catch (error) {
      // setErrorMessage('An error occurred. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong!',
      });
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollviewstyles}>
        <KeyboardAvoidingView enabled>
          {/* SVG Gradient Background */}
          <Svg
            height={containerHeight}
            width={width}
            style={styles.gradientBackground}>
            {/* Draw a diagonal rectangle */}
            <Polygon
              points={`0,0 ${width},0 ${width},${containerHeight} ${0},${containerHeight}`}
              fill={Colors.primaryColor}
            />
            <Polygon
              points={`${0},${containerHeight} ${width},0 ${width},${containerHeight} ${0},${containerHeight}`}
              fill="white" // Bottom color
            />
          </Svg>

          <View style={styles.screen}>
            <View style={styles.imageContainer}>
              <Image source={images.sign_in} style={styles.topImage} />
              <Image source={images.logo} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
              <Input
                title="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                inputType="phone-pad"
                maxLength={10}
                errorMessage={errorMessage}
                required={true}
              />
            </View>
            <View style={styles.pinContainer}>
              <View style={styles.PinContainer}>
                <Text style={styles.title}>PIN</Text>
                <Text style={styles.pinLabel}>*</Text>
              </View>
              <PinInput
                pinLength={4}
                secureTextEntry={true}
                onPinChange={handlePinChange}
              />
              {pinErrorMessage ? (
                <Text style={styles.errorText}>{pinErrorMessage}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000FF" />
              ) : (
                <Button onPress={handleLogin} title="Sign in" />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ToastNotification />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollviewstyles: {
    width: '100%',
    height: 'auto',
  },
  imageContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center', // Center the images horizontally
    zIndex: 1,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject, // Make the gradient fill the entire container
  },
  topImage: {
    width: '80%', // Adjust image size
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  logo: {
    width: '50%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent', // White background for the content
    zIndex: 2, // Ensure the screen content is above the gradient
  },
  inputContainer: {
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  pinContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: -2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.dangerColor,
    marginTop: 5,
    fontSize: 14,
  },
  PinContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pinLabel: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default LoginScreen;
