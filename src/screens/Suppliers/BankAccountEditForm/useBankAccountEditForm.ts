import {useBankAccountValidate} from '../BankAccountValidate/BankAccountValidate';
import {BankAccountEditFormProps} from './DTOs';
import {useState} from 'react';

const useBankAccountEditForm = (props: BankAccountEditFormProps) => {
  const {supplierDetails, setSupplierDetails, selectedItem} = props;

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
      const updatedBankAccounts = supplierDetails.bankAccounts.map(
        (item, index) =>
          index === selectedItem.id
            ? {accountName, accountNumber, ifscCode}
            : item,
      );
      setSupplierDetails(prev => ({
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
