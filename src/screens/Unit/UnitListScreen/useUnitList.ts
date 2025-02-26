import {useEffect, useState} from 'react';
import {useUnitService} from '../../../services/UnitService';
import {Unit} from '../DTOs/UnitProps';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

const useUnitList = () => {
  const unitService = useUnitService();
  const [unitDetails, setUnitDetails] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchUnit = async () => {
    setLoading(true);
    const unitData = await unitService.getUnits('');
    setUnitDetails(unitData);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchUnit();
    }
  }, [isFocused]);

  const handleUnitDelete = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this client?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await unitService.deleteUnit(id);
            fetchUnit();
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    unitDetails,
    fetchUnit,
    handleUnitDelete,
    loading,
  };
};

export {useUnitList};
