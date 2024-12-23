import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import images from '../../images/index';
import * as Animatable from 'react-native-animatable';
import RouteName from '../../navigation/RouteName';
import {AuthHelper} from '../../helpers/AuthHelper';

const SplashScreen = ({navigation}: any) => {
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
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image
          animation="zoomInDown"
          duration={1000}
          source={images.logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
