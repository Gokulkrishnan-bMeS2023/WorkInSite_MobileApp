

import { useState, useEffect, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { useUnitService } from '../../../services/UnitService';
import { useFocusEffect } from '@react-navigation/native';
import { useUnitInputValidate } from '../useUnitInputValidate';
import { Unit } from '../DTOs/UnitProps';

export const useUnitEdit = (id: string) => {
  const unitService = useUnitService();
  const [name, setName] = useState('');
  const [unitDetails, setUnitDetails] = useState<Unit>({
    id: 0, 
    name: '', 
  });
  const { error, validate, setError, initialError } = useUnitInputValidate({ name });
  const [loading, setLoading] = useState(true);

  const fetchUnit = async () => {
    setLoading(true); 
    try {
      const unitData = await unitService.getUnit(parseInt(id));
      setUnitDetails(unitData); 
      setName(unitData.name); 
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch unit details.',
      });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUnit();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchUnit(); 
    }, [id])
  );

  const hasUnsavedChanges = () => {
    return name !== unitDetails.name;
  };

  const handleSubmission = async () => {
    if (validate()) {
      const unit = {
        name,
      };
      await unitService.updateUnit(parseInt(id), unit);
      fetchUnit(); // Refresh unit data after update
    }
  };

  return {
    name,
    setName,
    unitDetails,
    handleSubmission,
    hasUnsavedChanges,
    error,
    loading, 
  };
};
