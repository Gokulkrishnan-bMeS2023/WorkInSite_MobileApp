import { useState } from 'react';
import { Alert } from 'react-native';
import RouteName from '../../../navigation/RouteName';


const useUnitCreation = ({ navigation }: any) => {
 
  const [name, setName] = useState('');
  const [error, setError] = useState<{ name: string }>({ name: '' });

  const validate = () => {
    if (!name.trim()) {
      setError({ name: 'Unit is required' });
      return false;
    }
    setError({ name: '' });
    return true;
  };

  const handleSubmission = async () => {
    if (validate()) {
      try {
        // await unitService.createUnit({ name });
        Alert.alert('Success', 'Unit created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (err) {
        Alert.alert('Error', 'Failed to create unit');
      }
    }
  };

  const handleBackPress = () => {
    if (name.trim()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save', onPress: handleSubmission },
          { text: 'Discard', onPress: () => navigation.navigate(RouteName.Home_SCREEN) },
        ],
      );
    } else {
    navigation.navigate(RouteName.Home_SCREEN) ;
    }
    return true;
  };

  return { name, setName, handleSubmission, handleBackPress, error };
};

export { useUnitCreation };
