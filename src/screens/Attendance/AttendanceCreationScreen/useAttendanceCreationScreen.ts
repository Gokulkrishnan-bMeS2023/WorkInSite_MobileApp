// import {useState} from 'react';
// import {useSiteService} from '../../../services/SiteService';
// import {Site} from '../../Sites/DTOs/SiteProps';
// import {useWorkTypeService} from '../../../services/WorkTypeService';
// import {useUnitService} from '../../../services/UnitService';
// import {useWorkRateAbstractService} from '../../../services/WorkRateAbstractService';
// import RouteName from '../../../navigation/RouteName';
// import {Alert} from 'react-native';
// import { useWorkRateAbstractValidate } from '../../Workers/InputValidate/WorkRateAbstractValidate';

// const useAttendanceCreationScreen = (navigation: any) => {
//   const [siteId, setSiteId] = useState('');
//   const [workTypeId, setWorkTypeId] = useState('');
//   const [unitId, setUnitId] = useState('');
//   const [totalRate, setTotalRate] = useState('');
//   const [totalQuantity, setTotalQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [siteList, setSiteList] = useState<Site[]>([]);
//   const [workTypeList, setWorkTypeList] = useState<any[]>([]);
//   const [unitList, setUnitList] = useState<any[]>([]);

//   const siteService = useSiteService();
//   const workTypeService = useWorkTypeService();
//   const unitService = useUnitService();
//   const workRateAbstractService = useWorkRateAbstractService();

//   const {error, validate, setError, initialError} = useWorkRateAbstractValidate(
//     {siteId, workTypeId, totalRate, totalQuantity, unitId},
//   );

//   const siteDetails = siteList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const workTypeDetails = workTypeList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const unitDetails = unitList.map(item => ({
//     label: item.name,
//     value: item.id.toString(),
//   }));

//   const fetchSites = async (searchString: string = '') => {
//     if (searchString) {
//       const sites = await siteService.getSites(searchString);
//       if (sites) setSiteList(sites.slice(0, 3));
//     }
//   };

//   const fetchWorkTypes = async (searchString: string = '') => {
//     if (searchString) {
//       const workType = await workTypeService.getWorkTypes(searchString);
//       if (workType) setWorkTypeList(workType.slice(0, 3));
//     }
//   };

//   const fetchUnits = async (searchString: string = '') => {
//     if (searchString) {
//       const units = await unitService.getUnits(searchString);
//       if (units) setUnitList(units.slice(0, 3));
//     }
//   };

//   const resetFormFields = () => {
//     setSiteId('');
//     setWorkTypeId('');
//     setUnitId('');
//     setTotalRate('');
//     setTotalQuantity('');
//     setNotes('');
//     setSiteList([]);
//     setWorkTypeList([]);
//     setUnitList([]);
//     setError(initialError);
//   };

//   const hasUnsavedChanges = () => {
//     return (
//       siteId !== '' ||
//       workTypeId !== '' ||
//       unitId !== '' ||
//       totalRate !== '' ||
//       totalQuantity !== '' ||
//       notes !== '' ||
//       siteList.length > 0 ||
//       workTypeList.length > 0 ||
//       unitList.length > 0
//     );
//   };

//   const handleBackPress = () => {
//     if (hasUnsavedChanges()) {
//       Alert.alert(
//         'Unsaved Changes',
//         'You have unsaved changes. Do you want to save them?',
//         [
//           {
//             text: 'Cancel',
//             onPress: () => {},
//             style: 'cancel',
//           },
//           {
//             text: 'Save',
//             onPress: () => {
//               handleSubmit();
//             },
//           },
//           {
//             text: 'Exit Without Save',
//             onPress: () => {
//               resetFormFields();
//               navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
//             },
//           },
//         ],
//         {cancelable: true},
//       );
//     } else {
//       resetFormFields();
//       navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (validate()) {
//       const workRateAbstract = {
//         siteId,
//         workTypeId,
//         unitId,
//         totalRate: totalRate,
//         totalQuantity: totalQuantity,
//         notes,
//       };
//       await workRateAbstractService.createWorkRateAbstract(workRateAbstract);
//       navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
//       resetFormFields();
//       setError(initialError);
//     }
//   };

//   return {
//     siteDetails,
//     workTypeDetails,
//     error,
//     siteId,
//     unitId,
//     unitDetails,
//     workTypeId,
//     totalRate,
//     totalQuantity,
//     notes,
//     handleBackPress,
//     hasUnsavedChanges,
//     setSiteId,
//     fetchSites,
//     fetchWorkTypes,
//     fetchUnits,
//     setWorkTypeId,
//     setTotalRate,
//     setTotalQuantity,
//     setNotes,
//     handleSubmit,
//     setUnitId,
//   };
// };

// export {useAttendanceCreationScreen};

//2
import {useState} from 'react';
import {useSiteService} from '../../../services/SiteService';
import {useWorkTypeService} from '../../../services/WorkTypeService';
import {useUnitService} from '../../../services/UnitService';
import {useWorkRateAbstractService} from '../../../services/WorkRateAbstractService';
import {Alert} from 'react-native';
import RouteName from '../../../navigation/RouteName';
import {useAttendanceInputValidate} from '../InputValidate/AttendanceValidate';
import {useShiftService} from '../../../services/ShiftService';
import {useWorkModeService} from '../../../services/WorkModeService';
import {useWorkerService} from '../../../services/WorkerService';
import {useWageTypeService} from '../../../services/WageTypeService';
import {useAttendanceService} from '../../../services/AttendanceService';

const useAttendanceCreationScreen = (navigation: any) => {
  const [siteId, setSiteId] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [wageTypeId, setWageTypeId] = useState('');
  const [shiftId, setShiftId] = useState('');
  const [workModeId, setWorkModeId] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [workedQuantity, setWorkedQuantity] = useState('');

  const [siteList, setSiteList] = useState<any[]>([]);
  const [workTypeList, setWorkTypeList] = useState<any[]>([]);
  const [unitList, setUnitList] = useState<any[]>([]);
  const [workerList, setWorkerList] = useState<any[]>([]);
  const [wageTypeList, setWageTypeList] = useState<any[]>([]);
  const [shiftList, setShiftList] = useState<any[]>([]);
  const [workModeList, setWorkModeList] = useState<any[]>([]);

  const siteService = useSiteService();
  const workTypeService = useWorkTypeService();
  const unitService = useUnitService();
  const shiftService = useShiftService();
  const workModeService = useWorkModeService();
  const workerService = useWorkerService();
  const wageTypeService = useWageTypeService();
  const attendanceService = useAttendanceService();

  const {error, validate, setError, initialError} = useAttendanceInputValidate({
    date,
    siteId,
    wageTypeId,
    workTypeId,
    workerId,
    workedQuantity,
    unitId,
    shiftId,
    workModeId,
  });

  // Convert lists to combobox format
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
  const workerDetails = workerList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const wageTypeDetails = wageTypeList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const shiftDetails = shiftList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const workModeDetails = workModeList.map(item => ({
    label: item.name,
    value: item.id.toString(),
  }));

  // Fetch functions for dropdowns
  const fetchSites = async (searchString: string = '') => {
    if (searchString) {
      const sites = await siteService.getSites(searchString);
      if (sites) setSiteList(sites.slice(0, 3));
    }
  };

  const fetchWorkTypes = async (searchString: string = '') => {
    if (searchString) {
      const workTypes = await workTypeService.getWorkTypes(searchString);
      if (workTypes) setWorkTypeList(workTypes.slice(0, 3));
    }
  };

  const fetchUnits = async (searchString: string = '') => {
    if (searchString) {
      const units = await unitService.getUnits(searchString);
      if (units) setUnitList(units.slice(0, 3));
    }
  };

  const fetchWorkers = async (searchString: string = '') => {
    if (searchString) {
      const workers = await workerService.getWorkers(searchString);
      if (workers) setWorkerList(workers.slice(0, 3));
    }
  };

  const fetchWageTypes = async (searchString: string = '') => {
    if (searchString) {
      const wageTypes = await wageTypeService.getWageTypes(searchString);
      if (wageTypes) setWageTypeList(wageTypes.slice(0, 3));
    }
  };

  const fetchShifts = async (searchString: string = '') => {
    if (searchString) {
      const shifts = await shiftService.getShifts(searchString);
      if (shifts) setShiftList(shifts.slice(0, 3));
    }
  };

  const fetchWorkModes = async (searchString: string = '') => {
    if (searchString) {
      const workModes = await workModeService.getWorkModes(searchString);
      if (workModes) setWorkModeList(workModes.slice(0, 3));
    }
  };

  // Reset form fields
  const resetFormFields = () => {
    setSiteId('');
    setWorkTypeId('');
    setUnitId('');
    setWorkerId('');
    setWageTypeId('');
    setShiftId('');
    setWorkModeId('');
    setNotes('');
    setDate('');
    setWorkedQuantity('');
    setError(initialError);
  };

  const hasUnsavedChanges = () => {
    return (
      siteId !== '' ||
      workTypeId !== '' ||
      unitId !== '' ||
      workerId !== '' ||
      wageTypeId !== '' ||
      shiftId !== '' ||
      workModeId !== '' ||
      notes !== '' ||
      date !== '' ||
      workedQuantity !== ''
    );
  };

  const handleBackPress = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save them?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Save', onPress: () => handleSubmit()},
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
      const attendance = {
        siteId,
        workTypeId,
        unitId,
        workerId,
        wageTypeId,
        shiftId,
        workModeId,
        notes,
        workedQuantity,
        date,
      };
      await attendanceService.createAttendance(attendance);
      navigation.navigate(RouteName.WORK_RATE_ABSTRACT_LIST);
      resetFormFields();
    }
  };

  return {
    siteDetails,
    workTypeDetails,
    unitDetails,
    workerDetails,
    wageTypeDetails,
    shiftDetails,
    workModeDetails,
    error,
    siteId,
    workTypeId,
    unitId,
    workerId,
    wageTypeId,
    shiftId,
    workModeId,
    notes,
    workedQuantity,
    date,
    setDate,
    setWorkedQuantity,
    setSiteId,
    setWorkTypeId,
    setUnitId,
    setWorkerId,
    setWageTypeId,
    setShiftId,
    setWorkModeId,
    setNotes,
    fetchSites,
    fetchWorkTypes,
    fetchUnits,
    fetchWorkers,
    fetchWageTypes,
    fetchShifts,
    fetchWorkModes,
    handleBackPress,
    handleSubmit,
    hasUnsavedChanges,
  };
};

export {useAttendanceCreationScreen};
