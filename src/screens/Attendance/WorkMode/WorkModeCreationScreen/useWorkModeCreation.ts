import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useWorkModeInputValidate} from '../useWorkModeInputValidate';
import {useWorkModeService} from '../../../../services/WorkModeService';
import RouteName from '../../../../navigation/RouteName';

export const useworkModeCreation = ({navigation}: any) => {
  const route = useRoute<any>();
  const workModeService = useWorkModeService();
  const isFocused = useIsFocused();

  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params?.name && isFocused) {
      setName(route.params.name);
    }
  }, [route.params?.name, isFocused]);

  // Corrected here, passing workModeName instead of name
  const {error, validate, setError, initialError} = useWorkModeInputValidate({
    name,
  });

  const resetFormFields = () => {
    setName('');
    setError(initialError);
  };

  const hasUnsavedChanges = () => name.trim() !== '';

  const handleBackPress = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Save', onPress: handleSubmission},
          {
            text: 'Exit Without Save',
            onPress: () => {
              resetFormFields();
              navigation.navigate(RouteName.Home_SCREEN); // You may want to navigate here
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      resetFormFields();
      navigation.navigate(RouteName.Home_SCREEN); // You may want to navigate here
    }
    return true;
  };

  const handleSubmission = async () => {
    if (validate()) {
      const workMode = {
        name,
      };
      const response = await workModeService.createWorkMode(workMode);
      resetFormFields();
      if (route.params?.redirect) {
        // navigation.navigate(route.params.redirect, {workModeId: response.id});
        return;
      }
    }
  };

  return {name, setName, error, handleSubmission, handleBackPress};
};
