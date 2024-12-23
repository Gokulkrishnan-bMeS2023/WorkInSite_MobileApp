import {useEffect, useState, useCallback} from 'react';
import {AuthHelper} from '../../helpers/AuthHelper';
import {useUserService} from '../../services/UserService';
import {useInputValidate} from '../Authantication/InputValidate/InputValidate';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const useUserProfile = () => {
  const userService = useUserService();
  const navigation = useNavigation();
  const IsFocused = useIsFocused();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const {error, validate} = useInputValidate({name, phoneNumber});

  const fetchUserProfile = useCallback(async () => {
    try {
      const profile = await AuthHelper.getUserProfile();
      if (profile) {
        setUser(profile);
        setName(profile.name);
        setPhoneNumber(profile.phone);
        setNotes(profile.note || '');
        if (profile.role?.name === 'Supervisor') {
          setIsDisabled(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [IsFocused]);

  const handleSubmission = async () => {
    if (validate()) {
      const userData = {name, phone: phoneNumber, note: notes};
      try {
        await userService.updateProfile(userData);
        const updatedProfile = await userService.getProfile();
        AuthHelper.setUserProfile(updatedProfile);
        navigation.navigate('Profile' as never);
      } catch (error: any) {
        error.response.data.map((i: any) =>
          Toast.show({
            type: 'error',
            text1: i.message,
            text2: 'Invalid Request',
          }),
        );
      }
    }
  };

  return {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    error,
    isActive,
    setIsActive,
    notes,
    setNotes,
    user,
    handleSubmission,
    isDisabled,
    fetchUserProfile,
  };
};

export {useUserProfile};
