import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useChangePassword from './useChangePassword';
import {Colors} from '../../utils';
import PinForm from '../../components/CommonComponets/PinForm/PinForm';

interface ChangePinScreenProps {
  navigation: any;
}

export default function ChangePinScreen({navigation}: ChangePinScreenProps) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Profile');
        setPin('');
        setConfirmPin('');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  const {pin, setPin, confirmPin, setConfirmPin, error, handleOnSave} =
    useChangePassword();

  const handleBackPress = () => {
    navigation.navigate('Profile');
    setPin('');
    setConfirmPin('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon
            name="arrow-left-circle"
            size={25}
            color={Colors.secondaryBgTextColor}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Password</Text>
      </View>
      <PinForm
        pin={pin}
        setPin={setPin}
        confirmPin={confirmPin}
        setConfirmPin={setConfirmPin}
        error={error}
        onSave={handleOnSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  header: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {color: '#fff', marginLeft: 10, fontWeight: 'bold'},
});
