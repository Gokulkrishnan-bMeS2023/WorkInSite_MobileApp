import {useState} from 'react';
import {WorkerDetailsType} from '../DTOs/WorkerDetails';
import {useBankAccountValidate} from '../../Suppliers/BankAccountValidate/BankAccountValidate';

const useBankAccountCreateForm = (props: WorkerDetailsType) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  let {error, validate} = useBankAccountValidate(
    accountName,
    accountNumber,
    ifscCode,
  );

  const handleAdd = () => {
    if (validate()) {
      props.setWorkerDetails(prev => ({
        ...prev,
        bankAccounts: [
          ...prev.bankAccounts,
          {accountName, accountNumber, ifscCode},
        ],
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
    handleAdd,
  };
};

export {useBankAccountCreateForm};
