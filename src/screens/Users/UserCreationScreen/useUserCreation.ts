import React, {useEffect, useState} from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useInputValidate} from '../../Authantication/InputValidate/InputValidate';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';

export const useUserCreation = (
  SupervisorOnly: any,
  supervisorname: string,
  redirect: string,
  navigation: any,
  handleSave: () => void,
) => {
  const [name, setName] = useState(supervisorname || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState(SupervisorOnly ? '3' : '');
  const isFocused = useIsFocused();

  const {roles, error, validate, setError, initialError} = useInputValidate({
    name,
    phoneNumber,
    role,
  });
  const userDetail = {name, phone: phoneNumber, roleId: Number(role)};

  // Reset input fields when the screen loses focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setName('');
        setPhoneNumber('');
        setRole('');
        setError(initialError);
      };
    }, []),
  );

  // useEffect(() => {
  //   if (supervisorname && SupervisorOnly) {
  //     setName(supervisorname);
  //     setRole('3');
  //   }
  // }, [supervisorname && SupervisorOnly && redirect && isFocused]);

  //2
  useEffect(() => {
    if (supervisorname && SupervisorOnly && isFocused) {
      setName(supervisorname);
      setRole('3');
    }
  }, [supervisorname, SupervisorOnly, isFocused]);

  const resetForm = () => {
    setName('');
    setPhoneNumber('');
    setRole('');
    setError(initialError);
  };
  const hasUnsavedChanges =
    name.trim() !== '' || phoneNumber.trim() !== '' || role !== '';

  const handleBack = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before exiting?',
        [
          {
            text: 'Save',
            onPress: () => {
              handleSave();
            },
          },
          {
            text: 'Exit Without Saving',
            onPress: () => {
              if (redirect) {
                resetForm();
                navigation.navigate(redirect);
                return;
              }
              navigation.navigate(RouteName.USER_LIST_SCREEN);
              resetForm();
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      if (redirect) {
        resetForm();
        navigation.navigate(redirect);
        return;
      }
      resetForm();
      navigation.navigate(RouteName.USER_LIST_SCREEN);
    }
    return true;
  };

  return {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    error,
    validate,
    userDetail,
    roles,
    handleBack,
    hasUnsavedChanges,
  };
};
