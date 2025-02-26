import {useState, useEffect, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {Shift} from '../DTOs/ShiftProps';
import {useShiftInputValidate} from '../useShiftInputValidate';
import {useShiftService} from '../../../../services/ShiftService';
import {ShiftDetailsProps} from '../DTOs/ShiftDetails';

export const useShiftEdit = (Props: ShiftDetailsProps) => {
  const {id, ShiftSheetRef, onUpdateSuccess} = Props;
  const shiftService = useShiftService();
  const [name, setName] = useState('');
  const [shiftDetails, setShiftDetails] = useState<Shift>({
    id: 0,
    name: '',
  });
  const {error, validate, setError, initialError} = useShiftInputValidate({
    name,
  });
  const [loading, setLoading] = useState(true);

  const fetchShift = async () => {
    setLoading(true);
    try {
      const shiftData = await shiftService.getShift(parseInt(id));
      setShiftDetails(shiftData);
      setName(shiftData.name);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch shift details.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShift();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchShift();
    }, [id]),
  );

  const hasUnsavedChanges = () => {
    return name !== shiftDetails.name;
  };

  const handleSubmission = async () => {
    if (validate()) {
      const shift = {
        name,
      };
      await shiftService.updateShift(parseInt(id), shift);
      fetchShift();
      onUpdateSuccess();
      ShiftSheetRef.current?.close();
    }
  };

  return {
    name,
    setName,
    shiftDetails,
    handleSubmission,
    hasUnsavedChanges,
    error,
    loading,
  };
};
