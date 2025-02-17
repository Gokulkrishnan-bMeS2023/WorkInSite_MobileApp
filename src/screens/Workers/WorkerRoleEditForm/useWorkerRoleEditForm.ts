import {useEffect, useState} from 'react';
import {useWorkerRoleInputValidate} from '../InputValidate/WorkerRoleValidate';

interface WorkerRoleEditFormProps {
  workerRoleList: {
    workerRole: string;
    salaryPerShift: string;
    hoursPerShift: string;
  }[];
  setworkerRoleList: (
    newList: {
      workerRole: string;
      salaryPerShift: string;
      hoursPerShift: string;
    }[],
  ) => void;
  selectedItem: {
    index: number;
    value: {workerRole: string; salaryPerShift: string; hoursPerShift: string};
  };
  refProp: any;
}
export const useWorkerRoleEditForm = (props: WorkerRoleEditFormProps) => {
  const {workerRoleList, setworkerRoleList, selectedItem, refProp} = props;
  const [workerRole, setWorkerRole] = useState(selectedItem.value.workerRole);
  const [salaryPerShift, setSalaryPerShift] = useState(
    selectedItem.value.salaryPerShift,
  );
  const [hoursPerShift, setHoursPerShift] = useState(
    selectedItem.value.hoursPerShift,
  );
  const {error, validate, setError, initialError} = useWorkerRoleInputValidate(
    workerRole,
    salaryPerShift,
    hoursPerShift,
  );

  // Effect to update form fields when selectedItem changes
  useEffect(() => {
    setWorkerRole(selectedItem.value.workerRole);
    setSalaryPerShift(selectedItem.value.salaryPerShift);
    setHoursPerShift(selectedItem.value.hoursPerShift);
  }, [selectedItem]);

  // Handle saving the edited worker role
  const handleSave = () => {
    if (validate()) {
      const updatedList = [...workerRoleList];
      updatedList[selectedItem.index] = {
        workerRole,
        salaryPerShift,
        hoursPerShift,
      };
      setworkerRoleList(updatedList);
      refProp.current.close();
      setError(initialError);
    }
  };
  return {
    workerRole,
    setWorkerRole,
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
