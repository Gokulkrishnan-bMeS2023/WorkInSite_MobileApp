import {useEffect, useState} from 'react';

interface WorkTypeEditFormProps {
  workTypeList: string[];
  setworkTypeList: (newList: string[]) => void;
  refProp?: React.RefObject<any>;
  selectedItem?: {index: number; value: string};
}

export const useWorkTypeEditForm = (props: WorkTypeEditFormProps) => {
  const {workTypeList, setworkTypeList, selectedItem, refProp} = props;
  const [newName, setNewName] = useState(selectedItem?.value || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setNewName(selectedItem?.value || '');
  }, [selectedItem]);

  const handleSave = () => {
    if (!selectedItem) return;

    if (newName.trim() === '') {
      setError('Enter work type');
      return;
    }
    const updatedList = [...workTypeList];
    updatedList[selectedItem.index] = newName.trim();
    setworkTypeList(updatedList);
    refProp?.current?.close();
    setError('');
  };

  return {
    handleSave,
    error,
    newName,
    setNewName,
  };
};
