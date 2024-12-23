import {Alert} from 'react-native';
import {UpiEditDeleteButtonsProp} from './DTOs';

const useUpiEditDeleteButtons = (props: UpiEditDeleteButtonsProp) => {
  const {workerDetails, setWorkerDetails} = props;

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Upi detail?',
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
      {cancelable: true}, // Allows dismissal by tapping outside
    );
  };

  const handleDelete = (id: number) => {
    const filteredUpiDetails = workerDetails.upiDetails.filter(
      (_, index) => index !== id,
    );
    setWorkerDetails(prev => ({...prev, upiDetails: filteredUpiDetails}));
  };

  return {confirmDelete};
};

export {useUpiEditDeleteButtons};
