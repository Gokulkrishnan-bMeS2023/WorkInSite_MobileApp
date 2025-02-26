import {useEffect, useState} from 'react';
import {WorkTypeEditFormProps} from '../DTOs/WorkTypeProps';
export const useWorkTypeEditForm = (props: WorkTypeEditFormProps) => {
  const {workTypeList, setWorkTypeList, selectedItem, Ref} = props;
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
    setWorkTypeList(updatedList);
    Ref?.current?.close();
    setError('');
  };

  return {
    handleSave,
    error,
    newName,
    setNewName,
  };
};
