import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {AuthHelper} from '../../helpers/AuthHelper';
import {AuthService} from '../../services/AuthService';
import {useUserService} from '../../services/UserService';
import RouteName from '../../navigation/RouteName';
import {useInputValidate} from './InputValidate/InputValidate';

const useLogin = ({navigation}: any) => {
  const [pin, setPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const userService = useUserService();
  const {error, validate} = useInputValidate({phoneNumber, pin});

  const handleSubmission = async () => {
    setLoading(true);
    if (validate()) {
      try {
        let accessToken: string = await AuthService.login(phoneNumber, pin);
        AuthHelper.setAccessToken(accessToken);
        const user = await userService.getProfile();
        AuthHelper.setUserProfile(user);
        if (user) {
          setPin('');
          setPhoneNumber('');
          navigation.navigate(RouteName.Home_SCREEN);
        }
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Phone number or pin is incorrect.',
          text2: 'Uh oh! Invalid login',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    pin,
    setPin,
    phoneNumber,
    setPhoneNumber,
    error,
    handleSubmission,
  };
};

export {useLogin};
