// src/hooks/useWorkerRoleInputValidate.ts
import {useState} from 'react';

const useWorkerRoleInputValidate = (
  workerRole: string,
  salaryPerShift: string,
  hoursPerShift: string,
) => {
  const initialError = {
    workerRole: '',
    salaryPerShift: '',
    hoursPerShift: '',
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

    if (!workerRole) updateError('workerRole', 'Please enter worker role');
    if (workerRole && workerRole.length < 2)
      updateError('workerRole', 'Worker role must be at least 2 characters');

    if (!salaryPerShift)
      updateError('salaryPerShift', 'Please enter salary per shift');
    if (salaryPerShift && isNaN(Number(salaryPerShift)))
      updateError('salaryPerShift', 'Salary must be a valid number');

    if (!hoursPerShift)
      updateError('hoursPerShift', 'Please enter hours per shift');
    if (hoursPerShift && isNaN(Number(hoursPerShift)))
      updateError('hoursPerShift', 'Hours must be a valid number');

    return isValid;
  };

  return {error, validate, initialError, setError};
};

export {useWorkerRoleInputValidate};
