import {MutableRefObject, useState} from 'react';
import {useUserService} from '../../../services/UserService';
import {useInputValidate} from '../../Authantication/InputValidate/InputValidate';
import {UserBase} from '../DTOs/UserBase';
import RouteName from '../../../navigation/RouteName';
import Toast from 'react-native-toast-message';

const useUserCreationPinForm = (
  userDetail: UserBase,
  navigation?: any,
  supervisorIds?: any,
  redirect?: string,
  bottomSheetRef?: MutableRefObject<any>,
) => {
  const userService = useUserService();

  const {name, phone, roleId} = userDetail;
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const {error, validate} = useInputValidate({pin, confirmPin});

  const handleOnSave = async () => {
    if (validate()) {
      try {
        const response = await userService.createUser({
          name,
          phone,
          roleId,
          password: pin,
          language: 'en',
        });
        if (redirect) {
          const parsedSupervisorIds = supervisorIds;
          parsedSupervisorIds.push(response.id);
          navigation.navigate(redirect, {
            supervisorIds: [parsedSupervisorIds.toString()],
          });
          bottomSheetRef?.current.close();
          return;
        }
        navigation.navigate(RouteName.USER_LIST_SCREEN);
      } catch (error: any) {
        bottomSheetRef?.current.close();
        error.response?.data.forEach((i: any) =>
          Toast.show({
            type: 'error',
            text1: 'Invalid Request',
            text2: i.message,
          }),
        );
      }
    }
  };
  return {pin, setPin, confirmPin, setConfirmPin, error, handleOnSave};
};

export {useUserCreationPinForm};
