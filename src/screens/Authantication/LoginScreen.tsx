import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  BackHandler,
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
import {useLogin} from './useLoigin';
import commonStyle from '../../styles/commonStyle';
import Styles from '../../styles/LoginScreenStyle';
import {numberRegex} from '../../utils/regex';
import Loader from '../../components/Loader/Loader';
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
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <View style={commonStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.scrollviewstyles}>
        <KeyboardAvoidingView enabled>
          <Svg
            height={containerHeight}
            width={width}
            style={Styles.gradientBackground}>
            <Polygon
              points={`0,0 ${width},0 ${width},${containerHeight} ${0},${containerHeight}`}
              fill={Colors.primaryColor}
            />
            <Polygon
              points={`${0},${containerHeight} ${width},0 ${width},${containerHeight} ${0},${containerHeight}`}
              fill="white"
            />
          </Svg>
          <View style={Styles.loginScreen}>
            <View style={Styles.imageContainer}>
              <Image source={images.sign_in} style={Styles.topImage} />
              <Image source={images.logo} style={Styles.loginLogo} />
            </View>
            <View style={commonStyle.inputfieldContainer}>
              <Input
                title="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                inputType="phone-pad"
                maxLength={10}
                errorMessage={error.phoneNumber}
                required={true}
                regex={numberRegex}
              />
              <PinInput
                label="Pin"
                value={pin}
                pinLength={4}
                secureTextEntry={true}
                onPinChange={setPin}
                errorMessage={error.pin}
                isRequired={true}
              />
              <View style={{alignItems: 'flex-end'}}>
                <Text style={Styles.text}>Forgot your PIN? </Text>
              </View>
              <View>
                {loading && !error.pin && !error.phoneNumber ? (
                  <Loader />
                ) : (
                  <Button onPress={handleSubmission} title="Sign in" />
                )}
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={Styles.loginLink}
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
export default LoginScreen;
