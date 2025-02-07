// import { useState, useEffect } from 'react';
// import { Alert } from 'react-native';
// import RouteName from '../../../navigation/RouteName';

// const useMaterialCreation = ({ navigation }: any) => {
  
//   const [name, setName] = useState('');
//   const [unitId, setUnitId] = useState('');
//   const [hsnCode, setHsnCode] = useState('');
//   const [unitOptions, setUnitOptions] = useState<{ label: string; value: string }[]>([]);
//   const [error, setError] = useState({
//     name: '',
//     unitId: '',
//     hsnCode: '',
//   });

//   const validate = () => {
//     const errors = {
//       name: name.trim() ? '' : 'Material name is required',
//       unitId: unitId ? '' : 'Unit is required',
//       hsnCode: hsnCode.trim() ? '' : 'HSN Code is required',
//     };
//     setError(errors);
//     return !Object.values(errors).some((e) => e !== '');
//   };

//   // const fetchUnits = async () => {
//   //   // const units = await unitService.getUnits();
//   //   const unitOptions = units.map((unit: { id: string; name: string }) => ({
//   //     label: unit.name,
//   //     value: unit.id,
//   //   }));
//   //   setUnitOptions(unitOptions);
//   // };

//   // useEffect(() => {
//   //   fetchUnits();
//   // }, []);

//   const handleSubmission = async () => {
//     if (validate()) {
//       try {
//         const material = { name, unitId: parseInt(unitId), hsnCode };
//         // await materialService.createMaterial(material);
//         Alert.alert('Success', 'Material created successfully', [
//           { text: 'OK', onPress: () => navigation.goBack() },
//         ]);
//       } catch (err) {
//         Alert.alert('Error', 'Failed to create material');
//       }
//     }
//   };

//   const handleBackPress = () => {
//     if (name || unitId || hsnCode) {
//       Alert.alert(
//         'Unsaved Changes',
//         'You have unsaved changes. Do you want to save them?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Save', onPress: handleSubmission },
//           { text: 'Discard', onPress: () =>  navigation.navigate(RouteName.Home_SCREEN)  },
//         ],
//       );
//     } else {
//       navigation.navigate(RouteName.Home_SCREEN) ;
//     }
//     return true;
//   };

//   return {
//     name,
//     setName,
//     unitId,
//     setUnitId,
//     hsnCode,
//     setHsnCode,
//     unitOptions,
//     error,
//     handleSubmission,
//     handleBackPress,
//   };
// };

// export { useMaterialCreation };


import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import RouteName from '../../../navigation/RouteName';

const useMaterialCreation = ({ navigation }: any) => {
  // State management
  const [name, setName] = useState('');
  const [unitId, setUnitId] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [unitOptions, setUnitOptions] = useState<{ label: string; value: string }[]>([]);
  const [error, setError] = useState({
    name: '',
    unitId: '',
    hsnCode: '',
  });

  // Validation function
  const validate = () => {
    const errors = {
      name: name.trim() ? '' : 'Material name is required',
      unitId: unitId ? '' : 'Unit is required',
      hsnCode: hsnCode.trim() ? '' : 'HSN Code is required',
    };
    setError(errors);
    return !Object.values(errors).some((e) => e !== '');
  };

  // Fetch unit options (mocked or via API)
  const fetchUnits = async () => {
    // Replace with your API call to fetch units
    const units = [
      { id: '1', name: 'Kg' },
      { id: '2', name: 'Litre' },
      { id: '3', name: 'Nos' },
    ];
    setUnitOptions(units.map((unit) => ({ label: unit.name, value: unit.id })));
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // Handle form submission
  const handleSubmission = async () => {
    if (validate()) {
      try {
        const material = { name, unitId: parseInt(unitId), hsnCode };
        // Replace with your API call to create material
        Alert.alert('Success', 'Material created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (err) {
        Alert.alert('Error', 'Failed to create material');
      }
    }
  };

  // Handle back button press
  const handleBackPress = () => {
    if (name || unitId || hsnCode) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save', onPress: handleSubmission },
          { text: 'Discard', onPress: () => navigation.goBack() },
        ],
      );
    } else {
      navigation.navigate(RouteName.Home_SCREEN);
    }
    return true;
  };

  return {
    name,
    setName,
    unitId,
    setUnitId,
    hsnCode,
    setHsnCode,
    unitOptions,
    error,
    handleSubmission,
    handleBackPress,
  };
};

export { useMaterialCreation };
