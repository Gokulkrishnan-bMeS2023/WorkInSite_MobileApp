import React from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils';
import Header from '../../components/CommonComponets/Header/Header';

const NotificationScreen = ({navigation}: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
     <Header title="Notifications" onBackPress={handleBackPress} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
});
