import {Alert} from 'react-native';
import {WorkerRole, WorkerRoleProps} from '../DTOs/WorkerRoleProps';
import {useRef, useState} from 'react';

export const useWorkerRoleList = ({
  workerRoleList,
  setWorkerRoleList,
}: WorkerRoleProps) => {
  const workerRoleBottomSheetRef = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState<{
    index: number;
    value: WorkerRole;
  } | null>(null);

  const handleEdit = (index: number, value: WorkerRole) => {
    setSelectedItem({index, value});
    workerRoleBottomSheetRef.current?.open();
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            setWorkerRoleList(workerRoleList.filter((_, i) => i !== index));
            console.log('Worker Role deleted');
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {workerRoleBottomSheetRef, selectedItem, handleDelete, handleEdit};
};
