import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';
import axios from 'axios';

const useWorkRateAbstractionList = ({navigation}: any) => {
  // const workRateAbstractService = useworkRateAbstractService();
  const [workRateAbstract, setWorkRateAbstract] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const IsFocused = useIsFocused();

  const fetchWorkRateAbstract = async () => {
    // const workRateAbstractData = await workRateAbstractService.getworkRateAbstracts(searchString);
    const workRateAbstractData = await axios.get(
      'https://workinsite-test-api.onrender.com/workerRateAbstract',
    );
    setWorkRateAbstract(workRateAbstractData.data);

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

  const redirectUrl = RouteName.WORK_RATE_ABSTRACT_LIST;
  const handleEditworkRateAbstract = (id: number) => {
    // navigation.navigate(RouteName.workRateAbstract_EDIT_SCREEN, {id: id});
    const redirect = redirectUrl;
    navigation.navigate(RouteName.WORK_RATE_ABSTRACT_EDIT, {
      workRateAbstractId: id,
      redirect,
    });
  };

  const handleworkRateAbstractDelete = async (id: number) => {
    // await workRateAbstractService.deleteworkRateAbstract(id);
    await axios.delete(
      `https://workinsite-test-api.onrender.com/workerRateAbstract/${id}`,
    );
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
