import {Alert} from 'react-native';

const useBankAccountEditDeleteButtons = <T,>(
  props: BankAccountEditDeleteButtonsProp<T>,
) => {
  const {details, setDetails} = props;

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Bank detail?',
      [
        {text: 'Cancel', style: 'cancel'},
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
    const filteredBankAccounts = details.bankAccounts.filter(
      (_, index) => index !== id,
    );
    setDetails(prev => ({...prev, bankAccounts: filteredBankAccounts}));
  };

  return {confirmDelete};
};

export {useBankAccountEditDeleteButtons};
