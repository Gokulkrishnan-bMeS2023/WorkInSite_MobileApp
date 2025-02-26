// import {useState, useEffect} from 'react';
// import {Alert} from 'react-native';
// import {useIsFocused, useRoute} from '@react-navigation/native';
// import RouteName from '../../../../navigation/RouteName';
// import {useShiftService} from '../../../../services/ShiftService';
// import {useShiftInputValidate} from '../useShiftInputValidate';

// export const useShiftCreation = ({navigation}: any) => {
//   const route = useRoute<any>();
//   const shiftService = useShiftService();
//   const isFocused = useIsFocused();

//   const [name, setName] = useState('');

//   useEffect(() => {
//     if (route.params?.name && isFocused) {
//       setName(route.params.name);
//     }
//   }, [route.params?.name, isFocused]);

//   const {error, validate, setError, initialError} = useShiftInputValidate({
//     name,
//   });

//   const resetFormFields = () => {
//     setName('');
//     setError(initialError);
//   };

//   const hasUnsavedChanges = () => name.trim() !== '';

//   const handleBackPress = () => {
//     if (hasUnsavedChanges()) {
//       Alert.alert(
//         'Unsaved Changes',
//         'You have unsaved changes. Do you want to save them?',
//         [
//           {text: 'Cancel', style: 'cancel'},
//           {text: 'Save', onPress: handleSubmission},
//           {
//             text: 'Exit Without Save',
//             onPress: () => {
//               resetFormFields();
//               navigation.navigate(RouteName.Home_SCREEN); // You may want to navigate here
//             },
//           },
//         ],
//         {cancelable: false},
//       );
//     } else {
//       resetFormFields();
//       navigation.navigate(RouteName.Home_SCREEN); // You may want to navigate here
//     }
//     return true;
//   };

//   const handleSubmission = async () => {
//     if (validate()) {
//       const workMode = {
//         name,
//       };
//       const response = await shiftService.createShift(workMode);
//       resetFormFields();
//       if (route.params?.redirect) {
//         // navigation.navigate(route.params.redirect, {workModeId: response.id});
//         return;
//       }
//     }
//   };

//   return {name, setName, error, handleSubmission, handleBackPress};
// };

//2
import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import RouteName from '../../../../navigation/RouteName';
import {useShiftService} from '../../../../services/ShiftService';
import {useShiftInputValidate} from '../useShiftInputValidate';
import {Shift} from '../DTOs/ShiftProps';

export const useShiftCreation = ({navigation}: any) => {
  const route = useRoute<any>();
  const shiftService = useShiftService();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [shiftDetails, setShiftDetails] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShift = async () => {
    setLoading(true);
    const shiftData = await shiftService.getShifts('');
    setShiftDetails(shiftData);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchShift();
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.name && isFocused) {
      setName(route.params.name);
    }
  }, [route.params?.name, isFocused]);

  const {error, validate, setError, initialError} = useShiftInputValidate({
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

  const handleShiftDelete = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Shift?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await shiftService.deleteShift(id);
            fetchShift();
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleSubmission = async () => {
    if (validate()) {
      const shift = {
        name,
      };

      const response = await shiftService.createShift(shift);
      if (response.id) {
        fetchShift();
      }
      resetFormFields();
      if (route.params?.redirect) {
        // navigation.navigate(route.params.redirect, {workModeId: response.id});
        return;
      }
    }
  };

  return {
    name,
    setName,
    error,
    handleSubmission,
    handleBackPress,
    shiftDetails,
    setShiftDetails,
    loading,
    fetchShift,
    setLoading,
    handleShiftDelete,
  };
};
