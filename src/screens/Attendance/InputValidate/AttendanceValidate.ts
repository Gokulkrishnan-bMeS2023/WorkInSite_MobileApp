import {useState} from 'react';

const useAttendanceInputValidate = (props: AttendanceInputProps) => {
  const {
    date,
    siteId,
    wageTypeId,
    workTypeId,
    workerId,
    workedQuantity,
    unitId,
    shiftId,
    workModeId,
  } = props;

  const initialError = {
    date: '',
    site: '',
    wageType: '',
    workType: '',
    worker: '',
    workedQuantity: '',
    unit: '',
    shift: '',
    workMode: '',
  };

  const [error, setError] = useState(initialError);

  const resetErrors = () => setError(initialError);

  const validate = () => {
    resetErrors();
    let isValid = true;

    const updateError = (field: keyof typeof error, message: string) => {
      setError(prev => ({...prev, [field]: message}));
      isValid = false;
    };

    if (!date) updateError('date', 'Please select a date');
    if (!siteId) updateError('site', 'Please select a site');
    if (!wageTypeId) updateError('wageType', 'Please select a wage type');
    if (!workTypeId) updateError('workType', 'Please select a work type');
    if (!workerId) updateError('worker', 'Please select a worker');
    if (!workedQuantity || isNaN(Number(workedQuantity)))
      updateError('workedQuantity', 'Enter a valid worked quantity');
    if (!unitId) updateError('unit', 'Please select a unit');
    if (!shiftId) updateError('shift', 'Please select a shift');
    if (!workModeId) updateError('workMode', 'Please select a work mode');

    return isValid;
  };

  return {error, validate, setError, resetErrors, initialError};
};

export {useAttendanceInputValidate};
