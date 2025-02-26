import axios from 'axios';
import {useState, useEffect} from 'react';
import {useSiteService} from '../../../services/SiteService';
import {Site} from '../../Sites/DTOs/SiteProps';
import {useWorkRateAbstractValidate} from '../InputValidate/WorkRateAbstractValidate';
import {useWorkTypeService} from '../../../services/WorkTypeService';
import {useUnitService} from '../../../services/UnitService';
import {useWorkRateAbstractService} from '../../../services/WorkRateAbstractService';
import RouteName from '../../../navigation/RouteName';
import {Alert} from 'react-native';

const useWorkRateAbstractCreate = (navigation: any) => {
  const [siteId, setSiteId] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [totalRate, setTotalRate] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [workTypeList, setWorkTypeList] = useState<any[]>([]);
  const [unitList, setUnitList] = useState<any[]>([]);

  const siteService = useSiteService();
  const workTypeService = useWorkTypeService();
  const unitService = useUnitService();
  const workRateAbstractService = useWorkRateAbstractService();

  const {error, validate, setError, initialError} = useWorkRateAbstractValidate(
    {siteId, workTypeId, totalRate, totalQuantity, unitId},
  );

  const siteDetails = siteList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const workTypeDetails = workTypeList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const unitDetails = unitList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const fetchSites = async (searchString: string = '') => {
    if (searchString) {
      const sites = await siteService.getSites(searchString);
      if (sites) setSiteList(sites.slice(0, 3));
    }
  };

  const fetchWorkTypes = async (searchString: string = '') => {
    if (searchString) {
      const workType = await workTypeService.getWorkTypes(searchString);
      if (workType) setWorkTypeList(workType.slice(0, 3));
    }
  };

  const fetchUnits = async (searchString: string = '') => {
    if (searchString) {
      const units = await unitService.getUnits(searchString);
      if (units) setUnitList(units.slice(0, 3));
    }
  };

  const resetFormFields = () => {
    setSiteId('');
    setWorkTypeId('');
    setUnitId('');
    setTotalRate('');
    setTotalQuantity('');
    setNotes('');
    setSiteList([]);
    setWorkTypeList([]);
    setUnitList([]);
    setError(initialError);
  };

  const hasUnsavedChanges = () => {
    return (
      siteId !== '' ||
      workTypeId !== '' ||
      unitId !== '' ||
      totalRate !== '' ||
      totalQuantity !== '' ||
      notes !== '' ||
      siteList.length > 0 ||
      workTypeList.length > 0 ||
      unitList.length > 0
    );
  };

  const handleBackPress = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: () => {
              handleSubmit();
            },
          },
          {
            text: 'Exit Without Save',
            onPress: () => {
              resetFormFields();
              navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      resetFormFields();
      navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const workRateAbstract = {
        siteId,
        workTypeId,
        unitId,
        totalRate: totalRate,
        totalQuantity: totalQuantity,
        notes,
      };
      await workRateAbstractService.createWorkRateAbstract(workRateAbstract);
      navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
      resetFormFields();
      setError(initialError);
    }
  };

  return {
    siteDetails,
    workTypeDetails,
    error,
    siteId,
    unitId,
    unitDetails,
    workTypeId,
    totalRate,
    totalQuantity,
    notes,
    handleBackPress,
    hasUnsavedChanges,
    setSiteId,
    fetchSites,
    fetchWorkTypes,
    fetchUnits,
    setWorkTypeId,
    setTotalRate,
    setTotalQuantity,
    setNotes,
    handleSubmit,
    setUnitId,
  };
};

export {useWorkRateAbstractCreate};
