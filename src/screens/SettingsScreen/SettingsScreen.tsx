import React from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/CommonComponets/Header/Header';
import commonStyle from '../../styles/commonStyle';

export default function SettingsScreen({navigation}: any) {

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
  const handleback = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={commonStyle.container}>
      <Header title="Settings" onBackPress={handleback} />
    </View>
  );
}
