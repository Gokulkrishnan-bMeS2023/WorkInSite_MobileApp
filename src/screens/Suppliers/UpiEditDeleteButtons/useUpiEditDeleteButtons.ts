import {Alert} from 'react-native';
import {UpiEditDeleteButtonsProp} from './DTOs';

const useUpiEditDeleteButtons = (props: UpiEditDeleteButtonsProp) => {
  const {supplierDetails, setSupplierDetails} = props;

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
      {cancelable: true}, 
    );
  };

  const handleDelete = (id: number) => {
    const filteredUpiDetails = supplierDetails.upiDetails.filter(
      (_, index) => index !== id,
    );
    setSupplierDetails(prev => ({...prev, upiDetails: filteredUpiDetails}));
  };

  return {confirmDelete};
};

export {useUpiEditDeleteButtons};
