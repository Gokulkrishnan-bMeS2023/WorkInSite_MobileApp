import {useState} from 'react';

const useWorkRateAbstractValidate = (
  siteId: string,
  workTypeId: string,
  totalRate: string,
  totalQuantity: string,
  unitId: string,
) => {
  const initialError = {
    site: '',
    workType: '',
    totalRate: '',
    totalQuantity: '',
    unit: '',
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

    if (!siteId) updateError('site', 'Please select a site');
    if (!workTypeId) updateError('workType', 'Please select a work type');
    if (!totalRate || isNaN(Number(totalRate)))
      updateError('totalRate', 'Enter a valid rate');
    if (!totalQuantity || isNaN(Number(totalQuantity)))
      updateError('totalQuantity', 'Enter a valid quantity');
    if (!unitId) updateError('unit', 'Please select a unit');

    return isValid;
  };

  return {error, validate, setError, initialError};
};

export {useWorkRateAbstractValidate};
