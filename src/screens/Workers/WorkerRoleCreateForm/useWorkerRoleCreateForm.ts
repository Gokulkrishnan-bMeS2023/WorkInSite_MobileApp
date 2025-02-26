import {useState} from 'react';
import {useWorkerRoleInputValidate} from '../InputValidate/WorkerRoleValidate';
import {WorkerRoleProps} from '../DTOs/WorkerRoleProps';

export const useWorkerRoleCreateForm = (props: WorkerRoleProps) => {
  const {workerRoleList, setWorkerRoleList} = props;
  const [name, setName] = useState('');
  const [salaryPerShift, setSalaryPerShift] = useState('');
  const [hoursPerShift, setHoursPerShift] = useState('');
  const {error, validate, setError, initialError} = useWorkerRoleInputValidate(
    name,
    salaryPerShift,
    hoursPerShift,
  );

  const handleAdd = () => {
    if (validate()) {
      const newRole = {
        name,
        salaryPerShift,
        hoursPerShift,
      };
      setWorkerRoleList([...workerRoleList, newRole]);
      setName('');
      setSalaryPerShift('');
      setHoursPerShift('');
      props?.Ref?.current.close();
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
    handleAdd,
    error,
  };
};
