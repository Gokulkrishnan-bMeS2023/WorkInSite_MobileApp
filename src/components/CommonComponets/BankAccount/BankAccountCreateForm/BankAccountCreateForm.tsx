import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useBankAccountCreateForm} from './useBankAccountCreateForm';
import Input from '../../Input/input';
import Button from '../../Button/Button';
import {ifscRegex, nameRegex, numberRegex} from '../../../../utils/regex';

interface BaseDetailsType {
  setDetails: (updater: (prev: any) => any) => void;
  // Ref: React.RefObject<{close: () => void}>;
  Ref?: any;
  details: {bankAccounts: any[]};
}

const BankAccountCreateForm = <T extends BaseDetailsType>(props: T) => {
  const {
    accountName,
    setAccountName,
    accountNumber,
    setAccountNumber,
    ifscCode,
    setIfscCode,
    error,
    handleAdd,
  } = useBankAccountCreateForm(props);

  return (
    <View style={styles.container}>
      <Input
        value={accountName}
        onChangeText={setAccountName}
        placeholder="Account name"
        maxLength={75}
        errorMessage={error.accountName}
        regex={nameRegex}
      />
      <Input
        value={accountNumber}
        onChangeText={setAccountNumber}
        maxLength={18}
        placeholder="Account number"
        errorMessage={error.accountNumber}
        regex={numberRegex}
      />
      <Input
        value={ifscCode}
        onChangeText={setIfscCode}
        maxLength={11}
        placeholder="IFSC Code"
        errorMessage={error.ifscCode}
        regex={ifscRegex}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
});

export {BankAccountCreateForm};
