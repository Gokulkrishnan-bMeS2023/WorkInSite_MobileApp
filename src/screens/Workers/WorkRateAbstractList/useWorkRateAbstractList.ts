import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import axios from 'axios';
import {useWorkRateAbstractService} from '../../../services/WorkRateAbstractService';

const useWorkRateAbstractionList = ({navigation}: any) => {
  const workRateAbstractService = useWorkRateAbstractService();
  const [workRateAbstract, setWorkRateAbstract] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const IsFocused = useIsFocused();

  const fetchWorkRateAbstract = async (searchString: string = '') => {
    const workRateAbstractData =
      await workRateAbstractService.getWorkRateAbstracts(searchString);
    setWorkRateAbstract(workRateAbstractData);

    if (workRateAbstractData) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkRateAbstract();
  }, [IsFocused]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this workRateAbstract?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await handleworkRateAbstractDelete(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleEditworkRateAbstract = (id: number) => {
    navigation.navigate(RouteName.WORK_RATE_ABSTRACT_EDIT, {
      workRateAbstractId: id,
    });
  };

  const handleworkRateAbstractDelete = async (id: number) => {
    await workRateAbstractService.deleteWorkRateAbstract(id);
    fetchWorkRateAbstract();
  };

  return {
    workRateAbstract,
    fetchWorkRateAbstract,
    confirmDelete,
    handleEditworkRateAbstract,
    loading,
  };
};

export {useWorkRateAbstractionList};
