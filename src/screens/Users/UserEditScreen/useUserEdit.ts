import {useState, useEffect} from 'react';
import {useInputValidate} from '../../Authantication/InputValidate/InputValidate';
import {User} from '../DTOs/User';
import {useUserService} from '../../../services/UserService';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

const useUserEdit = (id: string, navigation: any) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const {roles, error, validate, setError, initialError} = useInputValidate({
    name,
    phoneNumber,
  });
  const userService = useUserService();
  const isFocused = useIsFocused();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await userService.getUser(parseInt(id));
      if (userData) {
        setName(userData.name);
        setPhoneNumber(userData.phone);
        setNotes(userData.note);
        //
        setUser(userData);
        setRole(userData.role.id);
        setIsActive(userData.isActive);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id, isFocused]);

  const handleSubmission = async () => {
    if (validate()) {
      const user = {
        name: name,
        phone: phoneNumber,
        roleId: Number(role),
        isActive: isActive,
        note: notes,
      };
      try {
        await userService.updateUser(parseInt(id), user);
        navigation.navigate(RouteName.USER_LIST_SCREEN);
      } catch (error: any) {
        error.response.data.map((i: any) =>
          Toast.show({
            type: 'error',
            text1: 'Invalid Request',
            text2: i.message,
          }),
        );
      }
    }
  };

  const hasUnsavedChanges =
    name.trim() !== user?.name ||
    phoneNumber.trim() !== user?.phone ||
    Number(role) !== user?.role?.id ||
    isActive !== user?.isActive ||
    notes !== user?.note;

  const handleBack = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before exiting?',
        [
          {
            text: 'Save',
            onPress: () => {
              handleSubmission();
            },
          },
          {
            text: 'Exit Without Saving',
            onPress: () => {
              navigation.navigate(RouteName.USER_LIST_SCREEN);
              setError(initialError);
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
      navigation.navigate(RouteName.USER_LIST_SCREEN);
    }
    return true;
  };

  return {
    setName,
    setPhoneNumber,
    setRole,
    isActive,
    setIsActive,
    setNotes,
    error,
    user,
    name,
    phoneNumber,
    role,
    notes,
    handleSubmission,
    setLoading,
    roles,
    loading,
    hasUnsavedChanges,
    handleBack,
  };
};

export {useUserEdit};
