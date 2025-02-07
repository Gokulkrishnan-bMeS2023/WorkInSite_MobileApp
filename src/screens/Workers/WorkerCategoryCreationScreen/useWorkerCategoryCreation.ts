// import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
// import {useEffect, useState} from 'react';
// import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
// import RouteName from '../../../navigation/RouteName';
// import {useIsFocused} from '@react-navigation/native';
// import {Alert} from 'react-native';

// const useWorkerCategoryCreation = ({navigation, route}: any) => {
//   const redirectUrl = route?.params?.redirect;
//   const workerCategoryService = useWorkerCategoryService();
//   const [workerCategoryName, setWorkerCategoryName] = useState(
//     route?.params?.workerCategoryName || '',
//   );
//   const [notes, setNotes] = useState('');
//   const {error, validate} = useWorkerCategoryInputValidate(workerCategoryName);
//   const isFocused = useIsFocused();

//   const handleSubmission = async () => {
//     if (validate()) {
//       if (redirectUrl) {
//         const workerCategory = {workerCategoryName, note: notes};
//         const response = await workerCategoryService.createWorkerCategory(
//           workerCategory,
//         );
//         navigation.navigate(redirectUrl, {
//           workerCategoryId: response.id,
//           id: route?.params?.id || '',
//         });
//         return;
//       }
//       // navigation.navigate(RouteName.SITE_LIST_SCREEN);
//       navigation.navigate(RouteName.Home_SCREEN);
//     }
//   };

//   useEffect(() => {
//     if (route?.params?.workerCategoryName && isFocused) {
//       setWorkerCategoryName(route?.params?.workerCategoryName);
//     }
//   }, [route?.params?.workerCategoryName && isFocused]);

//   useEffect(() => {
//     if (!isFocused) {
//       setNotes('');
//     }
//   }, [isFocused]);

//   const hasUnsavedChanges =
//     workerCategoryName.trim() !== '' || notes.trim() !== '';

//   const handleNavigation = (redirectUrl: any) => {
//     if (redirectUrl) {
//       navigation.navigate(redirectUrl, {id: route?.params?.id || ''});
//     } else {
//       // navigation.navigate(RouteName.SITE_LIST_SCREEN);
//       navigation.navigate(RouteName.Home_SCREEN);
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
//     setWorkerCategoryName,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     hasUnsavedChanges,
//     handleSubmission,
//     isFocused,
//   };
// };

// export {useWorkerCategoryCreation};

//2

// import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
// import {useEffect, useState} from 'react';
// import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
// import RouteName from '../../../navigation/RouteName';
// import {useIsFocused} from '@react-navigation/native';
// import {Alert} from 'react-native';

// const useWorkerCategoryCreation = ({navigation, route}: any) => {
//   const redirectUrl = route?.params?.redirect;
//   const workerCategoryService = useWorkerCategoryService();
//   const [workerCategoryName, setWorkerCategoryName] = useState(
//     route?.params?.workerCategoryName || '',
//   );
//   const [notes, setNotes] = useState('');
//   const {error, validate} = useWorkerCategoryInputValidate(workerCategoryName);
//   const isFocused = useIsFocused();

//   const handleSubmission = async () => {
//     if (validate()) {
//       const workerCategory = {workerCategoryName, note: notes};
//       const response = await workerCategoryService.createWorkerCategory(
//         workerCategory,
//       );
//       if (redirectUrl) {
//         navigation.navigate(redirectUrl, {
//           workerCategoryId: response.id,
//           id: route?.params?.id || '',
//         });
//         return;
//       }
//       // navigation.navigate(RouteName.SITE_LIST_SCREEN);
//       navigation.navigate(RouteName.Home_SCREEN);
//     }
//   };

//   useEffect(() => {
//     if (route?.params?.workerCategoryName && isFocused) {
//       setWorkerCategoryName(route?.params?.workerCategoryName);
//     }
//   }, [route?.params?.workerCategoryName && isFocused]);

//   useEffect(() => {
//     if (!isFocused) {
//       setWorkerCategoryName('');
//       setNotes('');
//     }
//   }, [isFocused]);

//   const hasUnsavedChanges =
//     workerCategoryName.trim() !== '' || notes.trim() !== '';

//   const handleNavigation = (redirectUrl: any) => {
//     if (redirectUrl) {
//       navigation.navigate(redirectUrl, {id: route?.params?.id || ''});
//     } else {
//       // navigation.navigate(RouteName.SITE_LIST_SCREEN);
//       navigation.navigate(RouteName.Home_SCREEN);
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
//     setWorkerCategoryName,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     hasUnsavedChanges,
//     handleSubmission,
//     isFocused,
//   };
// };

// export {useWorkerCategoryCreation};

// //3
// import {useEffect, useState} from 'react';
// import {Alert} from 'react-native';
// import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
// import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
// import RouteName from '../../../navigation/RouteName';
// import {useIsFocused} from '@react-navigation/native';

// export const useWorkerCategoryCreation = ({navigation, route}: any) => {
//   const redirectUrl = route?.params?.redirect;
//   const workerCategoryService = useWorkerCategoryService();

//   const [workerCategoryName, setWorkerCategoryName] = useState(
//     route?.params?.workerCategoryName || '',
//   );
//   const [workerRole, setWorkerRole] = useState(route?.params?.workerRole || '');
//   const [salaryPerShift, setSalaryPerShift] = useState(
//     route?.params?.salaryPerShift || '',
//   );
//   const [hoursPerShift, setHoursPerShift] = useState(
//     route?.params?.hoursPerShift || '',
//   );
//   const [workType, setWorkType] = useState(route?.params?.workType || '');
//   const [notes, setNotes] = useState(route?.params?.notes || '');
//   const {error, validate, setError, initialError} =
//     useWorkerCategoryInputValidate(
//       workerCategoryName,
//       workerRole,
//       salaryPerShift,
//       hoursPerShift,
//       workType,
//     );
//   const isFocused = useIsFocused();

//   // Handle form submission
//   const handleSubmission = async () => {
//     if (validate()) {
//       const workerCategory = {
//         workerCategoryName,
//         workerRole,
//         salaryPerShift,
//         hoursPerShift,
//         workType,
//         note: notes,
//       };
//       const response = await workerCategoryService.createWorkerCategory(
//         workerCategory,
//       );
//       navigation.navigate(redirectUrl || RouteName.Home_SCREEN, {
//         workerCategoryId: response.id,
//         id: route?.params?.id || '',
//       });
//     }
//   };

//   // Reset states on blur
//   useEffect(() => {
//     if (!isFocused) {
//       setWorkerCategoryName('');
//       setWorkerRole('');
//       setSalaryPerShift('');
//       setHoursPerShift('');
//       setWorkType('');
//       setNotes('');
//       setError(initialError);
//     }
//   }, [isFocused]);

//   const hasUnsavedChanges =
//     workerCategoryName.trim() !== '' ||
//     workerRole.trim() !== '' ||
//     salaryPerShift.trim() !== '' ||
//     hoursPerShift.trim() !== '' ||
//     workType.trim() !== '' ||
//     notes.trim() !== '';

//   const handleNavigation = (redirect: string | undefined) => {
//     navigation.navigate(redirect || RouteName.Home_SCREEN, {
//       id: route?.params?.id || '',
//     });
//   };

//   const showUnsavedChangesAlert = () => {
//     Alert.alert(
//       'Unsaved Changes',
//       'You have unsaved changes. Do you want to save before exiting?',
//       [
//         {text: 'Save', onPress: handleSubmission},
//         {
//           text: 'Exit Without Saving',
//           onPress: () => handleNavigation(redirectUrl),
//         },
//         {text: 'Cancel', style: 'cancel'},
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle back navigation with unsaved changes
//   const handleBack = () => {
//     hasUnsavedChanges
//       ? showUnsavedChangesAlert()
//       : handleNavigation(redirectUrl);
//     return true;
//   };

//   return {
//     workerCategoryName,
//     setWorkerCategoryName,
//     workerRole,
//     setWorkerRole,
//     salaryPerShift,
//     setSalaryPerShift,
//     hoursPerShift,
//     setHoursPerShift,
//     workType,
//     setWorkType,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     handleSubmission,
//   };
// };

//4

// import {useEffect, useState} from 'react';
// import {Alert} from 'react-native';
// import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
// import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
// import RouteName from '../../../navigation/RouteName';
// import {useIsFocused} from '@react-navigation/native';

// import axios from 'axios';

// export const useWorkerCategoryCreation = ({navigation, route}: any) => {
//   const redirectUrl = route?.params?.redirect;
//   const workerCategoryService = useWorkerCategoryService();

//   const [workerCategoryName, setWorkerCategoryName] = useState(
//     route?.params?.workerCategoryName || '',
//   );
//   const [workerRole, setWorkerRole] = useState(route?.params?.workerRole || '');
//   const [salaryPerShift, setSalaryPerShift] = useState(
//     route?.params?.salaryPerShift || '',
//   );
//   const [hoursPerShift, setHoursPerShift] = useState(
//     route?.params?.hoursPerShift || '',
//   );
//   const [workType, setWorkType] = useState(route?.params?.workType || '');
//   const [notes, setNotes] = useState(route?.params?.notes || '');

//   const [workTypeList, setworkTypeList] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const [workerRoleList, setworkerRoleist] = useState<string[]>([]);
//   const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null);

//   const {error, validate, setError, initialError} =
//     useWorkerCategoryInputValidate(
//       workerCategoryName,
//       workerRole,
//       salaryPerShift,
//       hoursPerShift,
//       workType,
//       workTypeList,
//       workerRoleList,
//     );
//   const isFocused = useIsFocused();

//   const API_URL = 'https://workinsite-api.onrender.com/worker';

//   // Create Worker Category
//   const createWorkerCategory = async (workerCategory: any) => {
//     try {
//       const response = await axios.post(
//         // 'https://workinsite-test-api.onrender.com/dsc',
//         'https://workinsite-test-api.onrender.com/workerCategory',
//         workerCategory,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       return response.data;
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Status code:', error.response?.status);
//         console.error('Headers:', error.response?.headers);
//       } else {
//         console.error('Unexpected error:', error);
//       }
//       return null;
//     }
//   };

//   // Handle form submission
//   const handleSubmission = async () => {
//     if (validate()) {
//       const workerCategory = {
//         workerCategoryName,
//         workerRole: workerRoleList,
//         salaryPerShift,
//         hoursPerShift,
//         workType: workTypeList,
//         note: notes,
//       };
//       console.log('workerCategory', workerCategory);

//       // const response = await workerCategoryService.createWorkerCategory(
//       //   workerCategory,
//       // );
//       const response = await createWorkerCategory(workerCategory);

//       navigation.navigate(redirectUrl || RouteName.Home_SCREEN, {
//         workerCategoryId: response?.id || '',
//         id: route?.params?.id || '',
//       });
//     }
//   };

//   // Reset states on blur
//   useEffect(() => {
//     if (!isFocused) {
//       setWorkerCategoryName('');
//       setWorkerRole('');
//       setSalaryPerShift('');
//       setHoursPerShift('');
//       setWorkType('');
//       setNotes('');
//       setError(initialError);
//       setworkTypeList([]);
//       setEditingIndex(null);
//       setworkerRoleist([]);
//       setEditingRoleIndex(null);
//     }
//   }, [isFocused]);

//   const hasUnsavedChanges =
//     workerCategoryName.trim() !== '' ||
//     workerRole.trim() !== '' ||
//     salaryPerShift.trim() !== '' ||
//     hoursPerShift.trim() !== '' ||
//     workType.trim() !== '' ||
//     notes.trim() !== '' ||
//     workTypeList.length !== 0;

//   const handleNavigation = (redirect: string | undefined) => {
//     navigation.navigate(redirect || RouteName.Home_SCREEN, {
//       id: route?.params?.id || '',
//     });
//   };

//   const showUnsavedChangesAlert = () => {
//     Alert.alert(
//       'Unsaved Changes',
//       'You have unsaved changes. Do you want to save before exiting?',
//       [
//         {text: 'Save', onPress: handleSubmission},
//         {
//           text: 'Exit Without Saving',
//           onPress: () => handleNavigation(redirectUrl),
//         },
//         {text: 'Cancel', style: 'cancel'},
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle back navigation with unsaved changes
//   const handleBack = () => {
//     hasUnsavedChanges
//       ? showUnsavedChangesAlert()
//       : handleNavigation(redirectUrl);
//     return true;
//   };

//   // const [workType, setName] = useState('');
//   // const [error, setError] = useState('');

//   const handleAction = (actionType: 'add' | 'update') => {
//     if (!workType.trim()) {
//       // setError('Name is required');
//       Alert.alert('Error', 'Enter Work Type');
//       return;
//     }

//     // setError('');
//     if (actionType === 'add') {
//       setworkTypeList([...workTypeList, workType]);
//     } else if (actionType === 'update' && editingIndex !== null) {
//       const updatedList = [...workTypeList];
//       updatedList[editingIndex] = workType;
//       setworkTypeList(updatedList);
//       setEditingIndex(null);
//     }
//     setWorkType('');
//   };

//   const handleEdit = (index: number) => {
//     setWorkType(workTypeList[index]);
//     setEditingIndex(index);
//   };

//   // const handleDelete = (index: number) => {
//   //   setworkTypeList(prevList => prevList.filter((_, i) => i !== index));
//   // };

//   const handleDelete = (index: number) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this item?',
//       [
//         {
//           text: 'Cancel',
//           // onPress: () => console.log('Deletion cancelled'),
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             setworkTypeList(prevList => prevList.filter((_, i) => i !== index));
//             console.log('Item deleted');
//           },
//           style: 'destructive', // Optional for iOS to indicate a destructive action
//         },
//       ],
//     );
//   };

//   //role

//   const handleRoleAction = (actionType: 'add' | 'update') => {
//     if (!workerRole.trim()) {
//       // setError('Name is required');
//       Alert.alert('Error', 'Enter Worker Role');
//       return;
//     }

//     // setError('');
//     if (actionType === 'add') {
//       setworkerRoleist([...workerRoleList, workerRole]);
//     } else if (actionType === 'update' && editingRoleIndex !== null) {
//       const updatedList = [...workerRoleList];
//       updatedList[editingRoleIndex] = workerRole;
//       setworkerRoleist(updatedList);
//       setEditingRoleIndex(null);
//     }
//     setWorkerRole('');
//   };

//   const handleWorkerRoleEdit = (index: number) => {
//     setWorkerRole(workerRoleList[index]);
//     setEditingRoleIndex(index);
//   };

//   const handleWorkerRoleDelete = (index: number) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this item?',
//       [
//         {
//           text: 'Cancel',
//           // onPress: () => console.log('Deletion cancelled'),
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             setworkerRoleist(prevList =>
//               prevList.filter((_, i) => i !== index),
//             );
//             console.log('Item deleted');
//           },
//           style: 'destructive', // Optional for iOS to indicate a destructive action
//         },
//       ],
//     );
//   };

//   return {
//     workerCategoryName,
//     setWorkerCategoryName,
//     workerRole,
//     setWorkerRole,
//     salaryPerShift,
//     setSalaryPerShift,
//     hoursPerShift,
//     setHoursPerShift,
//     workType,
//     setWorkType,
//     notes,
//     setNotes,
//     error,
//     handleBack,
//     handleSubmission,
//     handleAction,
//     // handleSubmitList,
//     handleEdit,
//     handleDelete,
//     workTypeList,
//     setworkTypeList,
//     editingIndex,
//     setEditingIndex,
//     //new
//     workerRoleList,
//     setworkerRoleist,
//     editingRoleIndex,
//     setEditingRoleIndex,
//     handleRoleAction,
//     handleWorkerRoleEdit,
//     handleWorkerRoleDelete,
//   };
// };

//5

import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useWorkerCategoryService} from '../../../services/WorkerCategoryService';
import {useWorkerCategoryInputValidate} from '../InputValidate/WorkerCategoryInputValidate';
import RouteName from '../../../navigation/RouteName';
import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';

export const useWorkerCategoryCreation = ({navigation, route}: any) => {
  const redirectUrl = route?.params?.redirect;
  const workerCategoryService = useWorkerCategoryService();
  const [workerCategoryName, setWorkerCategoryName] = useState(
    route?.params?.workerCategoryName || '',
  );
  const [notes, setNotes] = useState(route?.params?.notes || '');
  const [workTypeList, setworkTypeList] = useState<string[]>([]);
  const [workerRoleList, setworkerRoleList] = useState<
    {workerRole: string; salaryPerShift: string; hoursPerShift: string}[]
  >([]);

  const {error, validate, setError, initialError} =
    useWorkerCategoryInputValidate(workerCategoryName);
  const isFocused = useIsFocused();

  // Create Worker Category
  const createWorkerCategory = async (workerCategory: any) => {
    try {
      const response = await axios.post(
        // 'https://workinsite-test-api.onrender.com/dsc',
        'https://workinsite-test-api.onrender.com/workerCategory',
        workerCategory,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Status code:', error.response?.status);
        console.error('Headers:', error.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      return null;
    }
  };

  // Handle form submission
  const handleSubmission = async () => {
    if (validate()) {
      const workerCategory = {
        workerCategoryName,
        workerRole: workerRoleList,
        workType: workTypeList,
        note: notes,
      };
      console.log('workerCategory', workerCategory);

      // const response = await workerCategoryService.createWorkerCategory(
      //   workerCategory,
      // );
      const response = await createWorkerCategory(workerCategory);

      navigation.navigate(redirectUrl || RouteName.Home_SCREEN, {
        workerCategoryId: response?.id || '',
        id: route?.params?.id || '',
      });
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
