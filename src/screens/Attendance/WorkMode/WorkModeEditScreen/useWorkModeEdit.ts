import {useState, useEffect, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {WorkMode} from '../DTOs/WorkModeProps';
import {useWorkModeService} from '../../../../services/WorkModeService';
import {useWorkModeInputValidate} from '../useWorkModeInputValidate';

export const useWorkModeEdit = (id: string) => {
  const workModeService = useWorkModeService();
  const [name, setName] = useState('');
  const [workModeDetails, setWorkModeDetails] = useState<WorkMode>({
    id: 0,
    name: '',
  });
  const {error, validate, setError, initialError} = useWorkModeInputValidate({
    name,
  });
  const [loading, setLoading] = useState(true);

  const fetchWorkMode = async () => {
    setLoading(true);
    try {
      const workModeData = await workModeService.getWorkMode(parseInt(id));
      setWorkModeDetails(workModeData);
      setName(workModeData.name);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch work mode details.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkMode();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchWorkMode();
    }, [id]),
  );

  const hasUnsavedChanges = () => {
    return name !== workModeDetails.name;
  };

  const handleSubmission = async () => {
    if (validate()) {
      const workMode = {
        name,
      };
      await workModeService.updateWorkMode(parseInt(id), workMode);
      fetchWorkMode();
    }
  };

  return {
    name,
    setName,
    workModeDetails,
    handleSubmission,
    hasUnsavedChanges,
    error,
    loading,
  };
};
