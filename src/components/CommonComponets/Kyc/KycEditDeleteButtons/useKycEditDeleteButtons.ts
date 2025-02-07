import {Alert} from 'react-native';
import {KycEditDeleteButtonsProp} from './DTOs';

const useKycEditDeleteButtons = ({
  details,
  setDetails,
}: KycEditDeleteButtonsProp) => {
  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Kyc detail?',
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
      {cancelable: true},
    );
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted item based on its id.
    const filteredKycDetails = details.kycDetails.filter(
      (_, index) => index !== id,
    );

    // Update the state with the filtered list.
    setDetails(prev => ({...prev, kycDetails: filteredKycDetails}));
  };

  return {confirmDelete};
};

export {useKycEditDeleteButtons};
