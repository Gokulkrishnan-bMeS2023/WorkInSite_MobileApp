import {useState} from 'react';

interface WorkTypeProps {
  workTypeList: string[];
  setworkTypeList: any;
  Ref: any;
}

export const useWorkType = (props: WorkTypeProps) => {
  const {workTypeList, setworkTypeList} = props;
  const [workType, setWorkType] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (workType) {
      setworkTypeList([...workTypeList, workType]);
      setWorkType('');
      props?.Ref?.current.close();
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
    setworkTypeList,
    error,
  };
};
