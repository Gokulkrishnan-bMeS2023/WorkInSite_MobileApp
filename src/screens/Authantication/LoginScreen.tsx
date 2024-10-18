import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PinInput from '../../components/CommonComponets/Pin/Pin';
import Input from '../../components/CommonComponets/Input/input';
import ToastNotification from '../../components/CommonComponets/Toast/Toast';
import Toast from 'react-native-toast-message';
import Button from '../../components/CommonComponets/Button/Button';

const LOGIN_URL =
  'https://sygycm9raj.ap-south-1.awsapprunner.com/user-service/v1/auth/login';

const LoginScreen = () => {
  const [enteredPin, setEnteredPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pinErrorMessage, setPinErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePinChange = (pin: string) => {
    setEnteredPin(pin);
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

    if (enteredPin.length !== 4) {
      setPinErrorMessage('Please enter a 4-digit PIN.');
      valid = false;
    }

    if (!valid) return;

    setLoading(true); // Show loading indicator

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          password: enteredPin,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Handle successful login (e.g., store token, navigate to next screen)
        // Alert.alert('Success', 'Login successful!');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your action was successful!',
        });
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong!',
        });
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.screen}>
      <Input
        title="Phone Number"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        inputType="phone-pad"
        maxLength={10}
        errorMessage={errorMessage}
        required={true}
      />
      <Text style={styles.title}>Enter your PIN</Text>
      <PinInput
        pinLength={4}
        secureTextEntry={true}
        onPinChange={handlePinChange}
      />
      {pinErrorMessage ? (
        <Text style={styles.errorText}>{pinErrorMessage}</Text>
      ) : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // <Button title="Login" onPress={handleLogin} />
        <Button onPress={handleLogin} title="Loing" />
      )}
      <ToastNotification />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    gap: 4,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  pinDisplay: {
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LoginScreen;
