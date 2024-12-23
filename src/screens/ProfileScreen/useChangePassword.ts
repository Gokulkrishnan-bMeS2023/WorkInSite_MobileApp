import {useState} from 'react';
import {useInputValidate} from '../Authantication/InputValidate/InputValidate';
import {useUserService} from '../../services/UserService';
import {useNavigation, NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Profile: undefined;
  ChangePassword: undefined; // Add other screens as needed
};

export default function usePasswordPassword() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {error, validate} = useInputValidate({pin, confirmPin});
  const userService = useUserService();

  const handleOnSave = async () => {
    if (validate()) {
      await userService.updateProfilePin(pin);
      setPin('');
      setConfirmPin('');
      navigation.navigate('Profile');
    }
  };

  return {pin, setPin, confirmPin, setConfirmPin, error, handleOnSave};
}
