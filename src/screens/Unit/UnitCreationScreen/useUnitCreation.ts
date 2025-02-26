import {useState, useEffect} from 'react';
import {useUnitService} from '../../../services/UnitService';
import {Alert} from 'react-native';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useUnitInputValidate} from '../useUnitInputValidate';

export const useUnitCreation = ({navigation}: any) => {
  const route = useRoute<any>();
  const unitService = useUnitService();
  const isFocused = useIsFocused();

  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params?.name && isFocused) {
      setName(route.params.name);
    }
  }, [route.params?.name, isFocused]);

  // Corrected here, passing unitName instead of name
  const {error, validate, setError, initialError} = useUnitInputValidate({
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
      const unit = {
        name,
      };
      const response = await unitService.createUnit(unit);
      resetFormFields();
      if (route.params?.redirect) {
        navigation.navigate(route.params.redirect, {unitId: response.id});
        return;
      }
    }
  };

  return {name, setName, error, handleSubmission, handleBackPress};
};
