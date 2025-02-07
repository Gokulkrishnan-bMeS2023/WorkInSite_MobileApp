import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils';
import Header from '../../components/CommonComponets/Header/Header';
export default function HistoryScreen({navigation}: any) {
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
       <Header title="History" onBackPress={handleBackPress} />
    </View>
  );
}

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
