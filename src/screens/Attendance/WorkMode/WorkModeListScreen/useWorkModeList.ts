import {useEffect, useState} from 'react';
import {WorkMode} from '../DTOs/WorkModeProps';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useWorkModeService} from '../../../../services/WorkModeService';

const useWorkModeList = () => {
  const workModeService = useWorkModeService();
  const [workModeDetails, setWorkModeDetails] = useState<WorkMode[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchWorkMode = async () => {
    setLoading(true);
    const workModeData = await workModeService.getWorkModes('');
    setWorkModeDetails(workModeData);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchWorkMode();
    }
  }, [isFocused]);

  const handleWorkModeDelete = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Work Mode?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await workModeService.deleteWorkMode(id);
            fetchWorkMode();
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    workModeDetails,
    fetchWorkMode,
    handleWorkModeDelete,
    loading,
  };
};

export {useWorkModeList};
