// import {useEffect, useState} from 'react';
// import {WorkerCategoryProps} from '../DTOs/WorkerCategoryProps';
// import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
// import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
// import RouteName from '../../../navigation/RouteName';
// import {useIsFocused} from '@react-navigation/native';
// import {Alert} from 'react-native';

// const useWorkerCategoryEdit = (
//   workerCategoryId: string,
//   navigation: any,
//   redirect: string,
//   route: any,
// ) => {
//   const redirectUrl = redirect;
//   const workerCategoryService = useWorkerCategoryService();

//   const [workerCategoryName, setWorkerCategoryName] = useState('');
//   const [notes, setNotes] = useState<string>('');
//   const [isActive, setIsActive] = useState(true);
//   const [workerCategoryList, setWorkerCategoryList] =
//     useState<WorkerCategoryProps>();
//   const isfocused = useIsFocused();

//   const {error, validate} = useWorkerCategoryInputValidate(workerCategoryName);

//   const fetchWorkerCategory = async () => {
//     const workerCategory = await workerCategoryService.getWorkerCategory(
//       parseInt(workerCategoryId),
//     );
//     setWorkerCategoryName(workerCategory.workerCategoryName);
//     setWorkerCategoryList(workerCategory);
//     setNotes(workerCategory.note);
//     setIsActive(workerCategory.isActive);
//   };

//   useEffect(() => {
//     fetchWorkerCategory();
//   }, [isfocused]);

//   const handleSubmission = async () => {
//     if (validate()) {
//       if (redirectUrl) {
//         const workerCategory = {
//           workerCategoryName,
//           note: notes as string,
//           isActive,
//         };
//         await workerCategoryService.updateWorkerCategory(
//           parseInt(workerCategoryId),
//           workerCategory,
//         );
//         navigation.navigate(redirectUrl, {
//           workerCategoryId: workerCategoryId,
//           id: route?.params?.id || '',
//         });

//         return;
//       }
//       navigation.navigate(RouteName.SITE_LIST_SCREEN);
//     }
//   };

//   const hasUnsavedChanges =
//     workerCategoryName !==
//       (workerCategoryList as WorkerCategoryProps)?.workerCategoryName ||
//     notes !== (workerCategoryList as WorkerCategoryProps)?.note ||
//     isActive !== (workerCategoryList as WorkerCategoryProps)?.isActive;

//   const handleNavigation = (redirectUrl: any) => {
//     if (redirectUrl) {
//       navigation.navigate(redirectUrl, {id: route?.params?.id || ''});
//     } else {
//       navigation.navigate(RouteName.SITE_LIST_SCREEN);
//     }
//   };

//   const showUnsavedChangesAlert = () => {
//     Alert.alert(
//       'Unsaved Changes',
//       'You have unsaved changes. Do you want to save before exiting?',
//       [
//         {
//           text: 'Save',
//           onPress: handleSubmission,
//         },
//         {
//           text: 'Exit Without Saving',
//           onPress: () => handleNavigation(redirectUrl),
//         },
//         {
//           text: 'Cancel',
//           onPress: () => {},
//           style: 'cancel',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const handleBack = () => {
//     if (hasUnsavedChanges) {
//       showUnsavedChangesAlert();
//     } else {
//       handleNavigation(redirectUrl);
//     }
//     return true;
//   };

//   return {
//     workerCategoryName,
//     workerCategoryList,
//     setWorkerCategoryName,
//     notes,
//     setNotes,
//     isActive,
//     setIsActive,
//     error,
//     handleBack,
//     hasUnsavedChanges,
//     handleSubmission,
//   };
// };

// export {useWorkerCategoryEdit};

//

import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';
import {WorkerCategoryProps} from '../DTOs/WorkerCategoryProps';

export const useWorkerCategoryCreation = ({navigation, route}: any) => {
  const redirectUrl = route?.params?.redirect;
  const {workerCategoryId, redirect} = route.params;

  const workerCategoryService = useWorkerCategoryService();
  const [workerCategoryName, setWorkerCategoryName] = useState(
    route?.params?.workerCategoryName || '',
  );
  const [notes, setNotes] = useState(route?.params?.notes || '');
  const [workTypeList, setworkTypeList] = useState<string[]>([]);
  const [workerRoleList, setworkerRoleList] = useState<
    {workerRole: string; salaryPerShift: string; hoursPerShift: string}[]
  >([]);
  const [isActive, setIsActive] = useState(true);
  const [workerCategoryList, setWorkerCategoryList] =
    useState<WorkerCategoryProps>();

  const {error, validate, setError, initialError} =
    useWorkerCategoryInputValidate(workerCategoryName);
  const isFocused = useIsFocused();

  const handleSubmission = async () => {
    if (validate()) {
      const workerCategory = {
        workerCategoryName,
        workType:workTypeList,
        workerRole: workerRoleList,
        workerRoleList,
        note: notes as string,
        isActive,
      };

      try {
        await axios.put(
          `https://workinsite-test-api.onrender.com/workerCategory/${workerCategoryId}`,
          workerCategory,
        );

        if (redirectUrl) {
          navigation.navigate(redirectUrl, {
            workerCategoryId,
            id: route?.params?.id || '',
          });
        } else {
          navigation.navigate(RouteName.SITE_LIST_SCREEN);
        }
      } catch (error) {
        console.error('Error updating worker category:', error);
      }
    }
  };

  // Reset states on blur
  useEffect(() => {
    if (!isFocused) {
      setWorkerCategoryName('');
      setNotes('');
      setError(initialError);
      setworkTypeList([]);
      setworkerRoleList([]);
    }
  }, [isFocused]);

  // const fetchWorkerCategory = async () => {
  //   const workerCategory = await workerCategoryService.getWorkerCategory(
  //     parseInt(workerCategoryId),
  //   );
  //   setWorkerCategoryName(workerCategory.workerCategoryName);
  //   setWorkerCategoryList(workerCategory);
  //   setNotes(workerCategory.note);
  //   setIsActive(workerCategory.isActive);
  // };

  const fetchWorkerCategory = async () => {
    try {
      const response = await fetch(
        `https://workinsite-test-api.onrender.com/workerCategory/${workerCategoryId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch worker category');
      }

      const workerCategory = await response.json();

      setWorkerCategoryName(workerCategory.workerCategoryName);
      setWorkerCategoryList(workerCategory);
      setNotes(workerCategory.note);
      setIsActive(workerCategory.isActive);
      setworkTypeList(workerCategory.workType);
      setworkerRoleList(workerCategory.workerRole);
    } catch (error) {
      console.error('Error fetching worker category:', error);
    }
  };

  useEffect(() => {
    fetchWorkerCategory();
  }, [isFocused]);

  const hasUnsavedChanges =
    workerCategoryName.trim() !== '' ||
    notes.trim() !== '' ||
    workTypeList.length !== 0;

  const handleNavigation = (redirect: string | undefined) => {
    navigation.navigate(redirect || RouteName.WORKER_CATEGORY_LIST_SCREEN, {
      id: route?.params?.id || '',
    });
  };

  const showUnsavedChangesAlert = () => {
    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Do you want to save before exiting?',
      [
        {text: 'Save', onPress: handleSubmission},
        {
          text: 'Exit Without Saving',
          onPress: () => handleNavigation(redirectUrl),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  // Handle back navigation with unsaved changes
  const handleBack = () => {
    hasUnsavedChanges
      ? showUnsavedChangesAlert()
      : handleNavigation(redirectUrl);
    return true;
  };

  return {
    workerCategoryName,
    setWorkerCategoryName,
    notes,
    setNotes,
    error,
    handleBack,
    handleSubmission,
    workTypeList,
    setworkTypeList,
    workerRoleList,
    setworkerRoleList,
  };
};
