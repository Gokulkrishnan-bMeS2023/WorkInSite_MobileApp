


import { Alert } from 'react-native';

interface WorkTypeProps {
  workTypeList: string[];
  setworkTypeList: (newList: string[]) => void;
}

export const useWorkTypeList = ({ workTypeList, setworkTypeList }: WorkTypeProps) => {
  const handleDelete = (index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setworkTypeList(workTypeList.filter((_, i) => i !== index));
          console.log('Item deleted');
        },
        style: 'destructive',
      },
    ]);
  };

  return { handleDelete };
};
