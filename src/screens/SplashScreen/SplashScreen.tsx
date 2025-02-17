import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Colors } from '../../utils';
import images from '../../images/index';
import * as Animatable from 'react-native-animatable';
import RouteName from '../../navigation/RouteName';
import { AuthHelper } from '../../helpers/AuthHelper';
import Styles from '../../styles/SplashScreenStyle'
import { useIsFocused } from '@react-navigation/native';
const SplashScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused()
  StatusBar.setBackgroundColor(Colors.primaryColor);
  useEffect(() => {
    const checkUserProfile = async () => {
      const profile = await AuthHelper.getUserProfile();
      if (profile) {
        navigation.navigate(RouteName.Home_SCREEN);
      } else {
        navigation.navigate(RouteName.LOGIN_SCREEN);
      }
    };
    setTimeout(checkUserProfile, 1500);
  }, [navigation, isFocused]);
  return (
    <View style={Styles.splashContainer}>
      <View style={Styles.splashLogoContainer}>
        <Animatable.Image
          animation="zoomInDown"
          duration={1000}
          source={images.logo}
          style={Styles.splashLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default SplashScreen;