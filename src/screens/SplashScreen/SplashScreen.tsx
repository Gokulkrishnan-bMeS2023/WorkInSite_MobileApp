import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import images from '../../images/index';
import * as Animatable from 'react-native-animatable';
import {RouteName} from '../../routers';

type SplashScreenProps = {
  navigation?: any; // Make navigation optional
};

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}: any) => {
  StatusBar.setBackgroundColor(Colors.primaryColor);

  // setTimeout(async () => {
  //   navigation.navigate(RouteName.Home_SCREEN);
  // }, 1500);

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
    backgroundColor: Colors.primaryColor, // Background color for the splash screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200, // Container size for the logo
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%', // Responsive sizing for the logo image
    height: '100%',
  },
});

export default SplashScreen;
