import {GenderTypes, WageTypes} from '../DTOs/WorkerProps';
import {WorkerInputValidateProps} from './DTOs';
import {useState} from 'react';

const useWorkerInputValidate = (props: WorkerInputValidateProps) => {
  const {name, dateOfBirth, workerCategoryId, contactId, gender, wageType} =
    props;

  const genderItems = [
    {label: 'Male', value: GenderTypes.MALE},
    {label: 'Female', value: GenderTypes.FEMALE},
  ];

  const wageTypesItems = [
    {label: 'Rate Work', value: WageTypes.RATEWORK},
    {label: 'NMR', value: WageTypes.NMR},
    {label: 'Others', value: WageTypes.OTHERS},
  ];

  const initialError = {
    name: '',
    contact: '',
    workerCategoryId: '',
    dateOfBirth: '',
    gender: '',
    wageType: '',
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

    if (!name) updateError('name', 'Please enter name');
    if (
      name &&
      (name.length < 2 || !/^[a-zA-Z]+ ?[a-zA-Z]+ ?[a-zA-Z]*$/.test(name))
    )
      updateError('name', 'Invalid name');
    if (!dateOfBirth) updateError('dateOfBirth', 'Please select date of birth');
    if (
      dateOfBirth &&
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
        dateOfBirth,
      )
    )
      updateError('dateOfBirth', 'Invalid date of birth');
    if (!workerCategoryId)
      updateError('workerCategoryId', 'Please select worker category');
    if (!contactId) updateError('contact', 'Please select contact');
    if (!gender) updateError('gender', 'Please select gender');
    if (!wageType) updateError('wageType', 'Please select wageType');

    return isValid;
  };

  return {genderItems, error, validate, setError, initialError, wageTypesItems};
};

export {useWorkerInputValidate};
