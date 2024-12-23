import {Alert} from 'react-native';
import {BankAccountEditDeleteButtonsProp} from './DTOs';

const useBankAccountEditDeleteButtons = (
  props: BankAccountEditDeleteButtonsProp,
) => {
  const {workerDetails, setWorkerDetails} = props;

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
      {cancelable: true}, // Allows dismissal by tapping outside
    );
  };

  const handleDelete = (id: number) => {
    const filteredBankAccounts = workerDetails.bankAccounts.filter(
      (_, index) => index !== id,
    );
    setWorkerDetails(prev => ({...prev, bankAccounts: filteredBankAccounts}));
  };

  return {confirmDelete};
};

export {useBankAccountEditDeleteButtons};
