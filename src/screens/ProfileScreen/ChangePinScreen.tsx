import React from 'react';
import {View, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useChangePassword from './useChangePassword';
import PinForm from '../../components/CommonComponets/PinForm/PinForm';
import Header from '../../components/CommonComponets/Header/Header';
import commonStyle from '../../styles/commonStyle';
interface ChangePinScreenProps {
  navigation: any;
}
export default function ChangePinScreen({navigation}: ChangePinScreenProps) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBackPress();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  const {
    pin,
    setPin,
    confirmPin,
    setConfirmPin,
    error,
    handleOnSave,
    handleBackPress,
  } = useChangePassword();

  return (
    <View style={commonStyle.container}>
      <Header title="Change PIN" onBackPress={handleBackPress} />
      <View style={commonStyle.inputfieldContainer}>
        <PinForm
          pin={pin}
          setPin={setPin}
          confirmPin={confirmPin}
          setConfirmPin={setConfirmPin}
          error={error}
          onSave={handleOnSave}
        />
      </View>
    </View>
  );
}
