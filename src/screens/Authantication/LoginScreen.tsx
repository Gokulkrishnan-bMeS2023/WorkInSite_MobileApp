import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, {Polygon} from 'react-native-svg'; // Import SVG components
import PinInput from '../../components/CommonComponets/Pin/Pin';
import Input from '../../components/CommonComponets/Input/input';
import ToastNotification from '../../components/CommonComponets/Toast/Toast';
import Button from '../../components/CommonComponets/Button/Button';
import images from '../../images';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native';
import Colors from '../../utils/color';
import RouteName from '../../navigation/RouteName';
import {useLogin} from './useLoigin';
const {width, height} = Dimensions.get('window');
const containerHeight = height / 2.8;
const LoginScreen = ({navigation}: any) => {
  const {
    pin,
    phoneNumber,
    error,
    handleSubmission,
    setPhoneNumber,
    setPin,
    loading,
  } = useLogin({navigation});

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
                onChangeText={setPhoneNumber}
                inputType="phone-pad"
                maxLength={10}
                errorMessage={error.phoneNumber}
                required={true}
              />
            </View>
            <View style={styles.pinContainer}>
              <View style={styles.PinContainer}>
                <Text style={styles.title}>Pin</Text>
                <Text style={styles.pinLabel}>*</Text>
              </View>
              <PinInput
                value={pin}
                pinLength={4}
                secureTextEntry={true}
                onPinChange={setPin}
              />
              {error.pin ? (
                <Text style={styles.errorText}>{error.pin}</Text>
              ) : null}
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.text}>Forgot your PIN? </Text>
            </View>
            <View style={styles.buttonContainer}>
              {loading && !error.pin && !error.phoneNumber ? (
                <ActivityIndicator size="large" color={Colors.primaryColor} />
              ) : (
                <Button onPress={handleSubmission} title="Sign in" />
              )}
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={styles.link}
                // onPress={() =>
                //   navigation.navigate(RouteName.REGISTRATION_SCREEN)
                // }
              >
                Create new account?
                <Text
                  style={{
                    color: Colors.secondaryColor,
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                  }}>
                  Sign up
                </Text>
              </Text>
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
    alignItems: 'center',
    zIndex: 1,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  topImage: {
    width: '70%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  logo: {
    width: '50%',
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  inputContainer: {
    marginBottom: 20,
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
    fontSize: 16,
    marginBottom: 10,
    color: Colors.black,
    fontWeight: '500',
  },
  errorText: {
    color: Colors.dangerColor,
    marginTop: 5,
    fontSize: 16,
  },
  PinContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pinLabel: {
    color: Colors.dangerColor,
    fontSize: 16,
    fontWeight: '400',
  },
  link: {
    color: Colors.grayColor,
    fontWeight: '500',
    fontSize: 16,
  },
  text: {
    color: Colors.secondaryColor,
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
export default LoginScreen;
