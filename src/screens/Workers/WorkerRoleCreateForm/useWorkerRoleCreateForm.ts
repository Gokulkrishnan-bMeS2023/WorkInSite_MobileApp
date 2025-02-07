import {useState} from 'react';
import {Alert} from 'react-native';
import {useWorkerRoleInputValidate} from '../InputValidate/WorkerRoleValidate';

interface WorkerRoleProps {
  workerRoleList: any;
  setworkerRoleList: any;
  Ref?: any;
}
export const useWorkerRoleCreateForm = (props: WorkerRoleProps) => {
  const {workerRoleList, setworkerRoleList} = props;
  const [workerRole, setWorkerRole] = useState('');
  const [salaryPerShift, setSalaryPerShift] = useState('');
  const [hoursPerShift, setHoursPerShift] = useState('');
  const {error, validate, setError, initialError} = useWorkerRoleInputValidate(
    workerRole,
    salaryPerShift,
    hoursPerShift,
  );

  const handleAdd = () => {
    if (validate()) {
      const newRole = {
        workerRole,
        salaryPerShift,
        hoursPerShift,
      };
      setworkerRoleList([...workerRoleList, newRole]);
      setWorkerRole('');
      setSalaryPerShift('');
      setHoursPerShift('');
      props?.Ref?.current.close();
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
    handleAdd,
    error,
  };
};
