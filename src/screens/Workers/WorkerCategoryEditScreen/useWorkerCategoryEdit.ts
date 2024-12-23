import {useEffect, useState} from 'react';
import {WorkerCategoryProps} from '../DTOs/WorkerCategoryProps';
import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useWorkerCategoryEdit = (
  workerCategoryId: string,
  navigation: any,
  redirect: string,
  route: any,
) => {
  const redirectUrl = redirect;
  const workerCategoryService = useWorkerCategoryService();

  const [workerCategoryName, setWorkerCategoryName] = useState('');
  const [notes, setNotes] = useState<string>('');
  const [isActive, setIsActive] = useState(true);
  const [workerCategoryList, setWorkerCategoryList] =
    useState<WorkerCategoryProps>();
  const isfocused = useIsFocused();

  const {error, validate} = useWorkerCategoryInputValidate(workerCategoryName);

  const fetchWorkerCategory = async () => {
    const workerCategory = await workerCategoryService.getWorkerCategory(
      parseInt(workerCategoryId),
    );
    setWorkerCategoryName(workerCategory.workerCategoryName);
    setWorkerCategoryList(workerCategory);
    setNotes(workerCategory.note);
    setIsActive(workerCategory.isActive);
  };

  useEffect(() => {
    fetchWorkerCategory();
  }, [isfocused]);

  const handleSubmission = async () => {
    if (validate()) {
      if (redirectUrl) {
        const workerCategory = {
          workerCategoryName,
          note: notes as string,
          isActive,
        };
        await workerCategoryService.updateWorkerCategory(
          parseInt(workerCategoryId),
          workerCategory,
        );
        navigation.navigate(redirectUrl, {
          workerCategoryId: workerCategoryId,
          id: route?.params?.id || '',
        });

        return;
      }
      navigation.navigate(RouteName.SITE_LIST_SCREEN);
    }
  };

  const hasUnsavedChanges =
    workerCategoryName !==
      (workerCategoryList as WorkerCategoryProps)?.workerCategoryName ||
    notes !== (workerCategoryList as WorkerCategoryProps)?.note ||
    isActive !== (workerCategoryList as WorkerCategoryProps)?.isActive;

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
    workerCategoryList,
    setWorkerCategoryName,
    notes,
    setNotes,
    isActive,
    setIsActive,
    error,
    handleBack,
    hasUnsavedChanges,
    handleSubmission,
  };
};

export {useWorkerCategoryEdit};
