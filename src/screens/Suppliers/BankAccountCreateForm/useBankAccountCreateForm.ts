import {useBankAccountValidate} from '../BankAccountValidate/BankAccountValidate';
import {useState} from 'react';
import {SupplierDetailsType} from '../DTOs/SupplierDetails';

const useBankAccountCreateForm = (props: SupplierDetailsType) => {
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
      props.setSupplierDetails(prev => ({
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
