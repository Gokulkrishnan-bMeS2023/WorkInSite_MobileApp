import { Alert } from 'react-native';
import {BankAccountEditDeleteButtonsProp} from './DTOs';

const useBankAccountEditDeleteButtons = (
  props: BankAccountEditDeleteButtonsProp,
) => {
  const {supplierDetails, setSupplierDetails} = props;

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Bank detail?',
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
    const filteredBankAccounts = supplierDetails.bankAccounts.filter(
      (_, index) => index !== id,
    );
    setSupplierDetails(prev => ({...prev, bankAccounts: filteredBankAccounts}));
  };

  return {confirmDelete};
};

export {useBankAccountEditDeleteButtons};
