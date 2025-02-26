import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import RouteName from '../../../navigation/RouteName';
import {useWorkRateAbstractValidate} from '../InputValidate/WorkRateAbstractValidate';
import {useSiteService} from '../../../services/SiteService';
import {Site} from '../../Sites/DTOs/SiteProps';
import {useWorkTypeService} from '../../../services/WorkTypeService';
import {useUnitService} from '../../../services/UnitService';
import {useWorkRateAbstractService} from '../../../services/WorkRateAbstractService';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import { WorkRateAbstract } from '../DTOs/WorkRateAbstract';
const useWorkRateAbstractEdit = ({navigation, route}: any) => {
  const {workRateAbstractId} = route.params;
  const [siteId, setSiteId] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [totalRate, setTotalRate] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [siteList, setSiteList] = useState<Site[]>([]);
  const [workTypeList, setWorkTypeList] = useState<any[]>([]);
  const [unitList, setUnitList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [workRateAbstract, setWorkRateAbstract] = useState<WorkRateAbstract>();

  const isFocused = useIsFocused();
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

  const handleSubmission = async () => {
    if (validate()) {
      const workRateAbstract = {
        siteId,
        workTypeId,
        unitId,
        totalRate: totalRate,
        totalQuantity: totalQuantity,
        notes,
      };
      await workRateAbstractService.updateWorkRateAbstract(
        parseInt(workRateAbstractId),
        workRateAbstract,
      );
      navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
      fetchWorkRateAbstract();
    }
  };

  const fetchWorkRateAbstract = async () => {
    setLoading(true);
    try {
      const workRateAbstractData: any =
        await workRateAbstractService.getWorkRateAbstract(
          parseInt(workRateAbstractId),
        );
      const {siteId, workTypeId, unitId, totalRate, totalQuantity, notes} =
        workRateAbstractData;
      setWorkRateAbstract(workRateAbstractData);
      setSiteId(siteId.toString());
      setWorkTypeId(workTypeId.toString());
      setUnitId(unitId.toString());
      setTotalRate(totalRate);
      setTotalQuantity(totalQuantity);
      setNotes(notes);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch site data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSiteById = async () => {
      if (siteId) {
        try {
          const site = await siteService.getSite(parseInt(siteId));
          setSiteList([site]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };

    fetchSiteById();
  }, [siteId, isFocused]);

  useEffect(() => {
    const fetchWorkTypeById = async () => {
      if (workTypeId) {
        try {
          const workType = await workTypeService.getWorkType(
            parseInt(workTypeId),
          );
          setWorkTypeList([workType]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };

    fetchWorkTypeById();
  }, [workTypeId, isFocused]);

  useEffect(() => {
    const fetchUnitById = async () => {
      if (unitId) {
        try {
          const unit = await unitService.getUnit(parseInt(unitId));
          setUnitList([unit]);
        } catch (error) {
          console.error('Failed to fetch contact:', error);
        }
      }
    };

    fetchUnitById();
  }, [unitId, isFocused]);

  useFocusEffect(
    useCallback(() => {
      fetchWorkRateAbstract(); // Fetch worker data again when the screen is focused
    }, [workRateAbstractId]), // Update dependencies if necessary
  );

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
      siteId !== workRateAbstract?.siteId ||
      workTypeId !== workRateAbstract?.workTypeId ||
      unitId !== workRateAbstract?.unitId ||
      totalRate !== workRateAbstract?.totalRate ||
      totalQuantity !== workRateAbstract?.totalQuantity ||
      notes !== workRateAbstract?.notes
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
              handleSubmission();
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

  return {
    siteDetails,
    workTypeId,
    totalRate,
    totalQuantity,
    notes,
    siteId,
    unitId,
    error,
    workTypeDetails,
    unitDetails,
    loading,
    hasUnsavedChanges,
    handleBackPress,
    setSiteId,
    handleSubmission,
    setWorkTypeId,
    setUnitId,
    setTotalRate,
    setTotalQuantity,
    setNotes,
    fetchWorkTypes,
    fetchUnits,
    fetchSites,
  };
};

export {useWorkRateAbstractEdit};
