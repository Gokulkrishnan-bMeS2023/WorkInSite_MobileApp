import {useState} from 'react';
import {WorkTypeProps} from '../DTOs/WorkTypeProps';
export const useWorkType = (props: WorkTypeProps) => {
  const {workTypeList, setWorkTypeList, Ref} = props;
  const [workType, setWorkType] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (workType) {
      setWorkTypeList([...workTypeList, workType]);
      setWorkType('');
      Ref?.current.close();
      setError('');
    } else {
      setError('Enter work type');
    }
  };

  return {
    workType,
    setWorkType,
    handleAdd,
    workTypeList,
    setWorkTypeList,
    error,
  };
};
