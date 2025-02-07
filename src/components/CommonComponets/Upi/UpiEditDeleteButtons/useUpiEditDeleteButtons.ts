import {Alert} from 'react-native';

export const useUpiEditDeleteButtons = <T extends { upiDetails: any[] }>(
  details: T,
  setDetails: React.Dispatch<React.SetStateAction<T>>
) => {
  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this UPI detail?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = (id: number) => {
    const filteredDetails = details.upiDetails.filter(
      (_, index) => index !== id
    );
    setDetails(prev => ({ ...prev, upiDetails: filteredDetails }));
  };

  return { confirmDelete };
};
