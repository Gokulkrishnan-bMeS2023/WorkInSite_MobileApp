import {Alert} from 'react-native';
import {SelectedItemProps, WorkTypeProps} from '../DTOs/WorkTypeProps';
import {useRef, useState} from 'react';

export const useWorkTypeList = ({
  workTypeList,
  setWorkTypeList,
}: WorkTypeProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItemProps | null>(
    null,
  );
  const bottomSheetRef = useRef<any>(null);
  const handleEdit = (index: number, value: string) => {
    setSelectedItem({index, value});
    bottomSheetRef.current?.open();
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
            setWorkTypeList(workTypeList.filter((_, i) => i !== index));
            console.log('Item deleted');
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    handleDelete,
    handleEdit,
    selectedItem,
    setSelectedItem,
    bottomSheetRef,
  };
};
