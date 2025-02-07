import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import axios from 'axios';

const useWorkerCategoryList = ({navigation}: any) => {
  // const WorkerCategoryService = useWorkerCategoryService();
  const [WorkerCategoryDetails, setWorkerCategoryDetails] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const IsFocused = useIsFocused();

  const fetchWorkerCategory = async () => {
    // const WorkerCategoryData = await WorkerCategoryService.getWorkerCategorys(searchString);
    const WorkerCategoryData = await axios.get(
      'https://workinsite-test-api.onrender.com/WorkerCategory',
    );
    setWorkerCategoryDetails(WorkerCategoryData.data);
    if (WorkerCategoryData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkerCategory();
  }, [IsFocused]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this WorkerCategory?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await handleWorkerCategoryDelete(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const redirectUrl = RouteName.WORKER_CATEGORY_LIST_SCREEN;
  const handleEditWorkerCategory = (id: number) => {
    // navigation.navigate(RouteName.WorkerCategory_EDIT_SCREEN, {id: id});
    const redirect = redirectUrl;
    navigation.navigate(RouteName.WORKER_CATEGORY_EDIT_SCREEN, {
      workerCategoryId: id,
      redirect,
    });
  };

  const handleWorkerCategoryDelete = async (id: number) => {
    // await WorkerCategoryService.deleteWorkerCategory(id);
    await axios.delete(
      `https://workinsite-test-api.onrender.com/WorkerCategory/${id}`,
    );
    fetchWorkerCategory();
  };

  return {
    WorkerCategoryDetails,
    fetchWorkerCategory,
    confirmDelete,
    handleEditWorkerCategory,
    loading,
  };
};

export {useWorkerCategoryList};
