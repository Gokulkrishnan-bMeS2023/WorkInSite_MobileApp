import {useEffect, useState} from 'react';
import {useWorkerService} from '../../../services/WorkerService';
import {Worker} from '../DTOs/WorkerProps';
import {useIsFocused} from '@react-navigation/native';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';

const useWorkerList = ({navigation}: any) => {
  const workerService = useWorkerService();
  const [workerDetails, setWorkerDetails] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  const IsFocused = useIsFocused();

  const fetchWorker = async (searchString: string = '') => {
    const workerData = await workerService.getWorkers(searchString);
    setWorkerDetails(workerData);
    if (workerData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorker();
  }, [IsFocused]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this worker?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await handleWorkerDelete(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleEditWorker = (id: number) => {
    navigation.navigate(RouteName.WORKER_EDIT_SCREEN, {id: id});
  };

  const handleWorkerDelete = async (id: number) => {
    await workerService.deleteWorker(id);
    fetchWorker();
  };

  return {
    workerDetails,
    fetchWorker,
    confirmDelete,
    handleEditWorker,
    loading,
  };
};

export {useWorkerList};
