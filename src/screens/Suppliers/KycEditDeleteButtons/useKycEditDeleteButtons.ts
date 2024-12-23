import {Alert} from 'react-native';
import {KycEditDeleteButtonsProp} from './DTOs';

const useKycEditDeleteButtons = (props: KycEditDeleteButtonsProp) => {
  const {supplierDetails, setSupplierDetails} = props;

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
    const filteredKycDetails = supplierDetails.kycDetails.filter(
      (_, index) => index !== id,
    );
    setSupplierDetails(prev => ({...prev, kycDetails: filteredKycDetails}));
  };

  return {confirmDelete};
};

export {useKycEditDeleteButtons};
