import {useBankAccountValidate} from '../../Suppliers/BankAccountValidate/BankAccountValidate';
import {BankAccountEditFormProps} from './DTOs';
import {useState} from 'react';

const useBankAccountEditForm = (props: BankAccountEditFormProps) => {
  const {workerDetails, setWorkerDetails, selectedItem} = props;

  const [accountName, setAccountName] = useState(selectedItem.accountName);
  const [accountNumber, setAccountNumber] = useState(
    selectedItem.accountNumber,
  );
  const [ifscCode, setIfscCode] = useState(selectedItem.ifscCode);
  const {error, validate} = useBankAccountValidate(
    accountName,
    accountNumber,
    ifscCode,
  );

  const handleUpdate = () => {
    if (validate()) {
      const updatedBankAccounts = workerDetails.bankAccounts.map(
        (item, index) =>
          index === selectedItem.id
            ? {accountName, accountNumber, ifscCode}
            : item,
      );
      setWorkerDetails(prev => ({
        ...prev,
        bankAccounts: [...updatedBankAccounts],
      }));
      props.Ref?.current.close();
    }
  };

  return {
    accountName,
    setAccountName,
    accountNumber,
    setAccountNumber,
    ifscCode,
    setIfscCode,
    error,
    handleUpdate,
  };
};

export {useBankAccountEditForm};
