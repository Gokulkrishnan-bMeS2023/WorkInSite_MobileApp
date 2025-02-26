import {useEffect, useState} from 'react';
import {useWorkerRoleInputValidate} from '../InputValidate/WorkerRoleValidate';
import {WorkerRoleEditFormProps} from '../DTOs/WorkerRoleProps';

export const useWorkerRoleEditForm = (props: WorkerRoleEditFormProps) => {
  const {workerRoleList, setWorkerRoleList, selectedItem, refProp} = props;
  const [name, setName] = useState(selectedItem.value.name);
  const [salaryPerShift, setSalaryPerShift] = useState(
    selectedItem.value.salaryPerShift,
  );
  const [hoursPerShift, setHoursPerShift] = useState(
    selectedItem.value.hoursPerShift,
  );
  const {error, validate, setError, initialError} = useWorkerRoleInputValidate(
    name,
    salaryPerShift,
    hoursPerShift,
  );

  // Effect to update form fields when selectedItem changes
  useEffect(() => {
    setName(selectedItem.value.name);
    setSalaryPerShift(selectedItem.value.salaryPerShift);
    setHoursPerShift(selectedItem.value.hoursPerShift);
  }, [selectedItem]);

  // Handle saving the edited worker role
  const handleSave = () => {
    if (validate()) {
      const updatedList = [...workerRoleList];
      updatedList[selectedItem.index] = {
        name,
        salaryPerShift,
        hoursPerShift,
      };
      setWorkerRoleList(updatedList);
      refProp.current.close();
      setError(initialError);
    }
  };
  return {
    name,
    setName,
    salaryPerShift,
    setSalaryPerShift,
    hoursPerShift,
    setHoursPerShift,
    handleSave,
    error,
    validate,
    setError,
    initialError,
  };
};
