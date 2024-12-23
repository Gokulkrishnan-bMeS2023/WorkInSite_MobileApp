import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
import {useEffect, useState} from 'react';
import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useWorkerCategoryCreation = ({navigation, route}: any) => {
  const redirectUrl = route?.params?.redirect;
  const workerCategoryService = useWorkerCategoryService();
  const [workerCategoryName, setWorkerCategoryName] = useState(
    route?.params?.workerCategoryName || '',
  );
  const [notes, setNotes] = useState('');
  const {error, validate} = useWorkerCategoryInputValidate(workerCategoryName);
  const isFocused = useIsFocused();

  const handleSubmission = async () => {
    if (validate()) {
      if (redirectUrl) {
        const workerCategory = {workerCategoryName, note: notes};
        const response = await workerCategoryService.createWorkerCategory(
          workerCategory,
        );
        navigation.navigate(redirectUrl, {
          workerCategoryId: response.id,
          id: route?.params?.id || '',
        });
        return;
      }
      navigation.navigate(RouteName.SITE_LIST_SCREEN);
    }
  };

  useEffect(() => {
    if (route?.params?.workerCategoryName && isFocused) {
      setWorkerCategoryName(route?.params?.workerCategoryName);
    }
  }, [route?.params?.workerCategoryName && isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setNotes('');
    }
  }, [isFocused]);

  const hasUnsavedChanges =
    workerCategoryName.trim() !== '' || notes.trim() !== '';

  const handleNavigation = (redirectUrl: any) => {
    if (redirectUrl) {
      navigation.navigate(redirectUrl, {id: route?.params?.id || ''});
    } else {
      navigation.navigate(RouteName.SITE_LIST_SCREEN);
    }
  };

  const showUnsavedChangesAlert = () => {
    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Do you want to save before exiting?',
      [
        {
          text: 'Save',
          onPress: handleSubmission,
        },
        {
          text: 'Exit Without Saving',
          onPress: () => handleNavigation(redirectUrl),
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      showUnsavedChangesAlert();
    } else {
      handleNavigation(redirectUrl);
    }
    return true;
  };

  return {
    workerCategoryName,
    setWorkerCategoryName,
    notes,
    setNotes,
    error,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
    isFocused,
  };
};

export {useWorkerCategoryCreation};
